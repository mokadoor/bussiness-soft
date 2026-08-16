'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from '@/lib/translation';

const DEFAULT_SUBJECTS = [
  'Request a demo',
  'ERP Consulting',
  'Custom Software Development',
  'ERP Implementation',
  'Technical Support',
  'Partnership',
  'Other',
];

type FormValues = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
  consent: boolean;
};

export function ContactForm() {
  const dictionary = useTranslation();
  const contactForm = dictionary.pages.contact.form;
  const [submitted, setSubmitted] = React.useState(false);

  // Schema is scoped to this component instance via useMemo to avoid shared
  // state between renders. The validation messages intentionally fall back to
  // English defaults so missing locale keys do not crash the page.
  const schema = React.useMemo(() => {
    return z.object({
      name: z.string().min(2, 'Please enter your full name'),
      email: z.string().email('Please enter a valid email address'),
      phone: z.string().min(8, 'Please enter a valid phone number'),
      company: z.string().optional(),
      subject: z.string().min(2, 'Please select a subject'),
      message: z.string().min(10, 'Please tell us a bit more (at least 10 characters)'),
      consent: z.boolean().refine((v) => v, 'You must agree to be contacted'),
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
      consent: false,
    },
  });

  const subjectValue = watch('subject');
  const consentValue = watch('consent');

  const onSubmit = async (data: FormValues) => {
    const loadingToastId = toast.loading(contactForm.sending, {
      description: contactForm.sendMessage,
      className:
        'border-slate-300 bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100',
    });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Request failed');

      toast.dismiss(loadingToastId);
      setSubmitted(true);
      reset();
      toast.success(contactForm.thankYou, {
        description: contactForm.sent,
        className:
          'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100',
      });
    } catch {
      toast.dismiss(loadingToastId);
      toast.error('Message not sent', {
        description: 'Please try again in a moment.',
        className:
          'border-red-300 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100',
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-background p-10 text-center shadow-card">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        </div>
        <h3 className="mt-5 text-xl font-semibold tracking-tight">{contactForm.thankYou}</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {contactForm.sent}
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          {contactForm.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-background p-7 shadow-card sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">
            {contactForm.fullName} <span className="text-destructive">*</span>
          </Label>
          <Input id="name" placeholder={contactForm.placeholder.name} {...register('name')} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            {contactForm.email} <span className="text-destructive">*</span>
          </Label>
          <Input id="email" type="email" placeholder={contactForm.placeholder.email} {...register('email')} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">
            {contactForm.phone} <span className="text-destructive">*</span>
          </Label>
          <Input id="phone" placeholder={contactForm.placeholder.phone} {...register('phone')} />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">{contactForm.company}</Label>
          <Input id="company" placeholder={contactForm.placeholder.company} {...register('company')} />
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="subject">
          {contactForm.subject} <span className="text-destructive">*</span>
        </Label>
        <Select
          value={subjectValue}
          onValueChange={(v) => setValue('subject', v, { shouldValidate: true })}
        >
          <SelectTrigger id="subject" className="w-full">
            <SelectValue placeholder={contactForm.placeholder.subject} />
          </SelectTrigger>
          <SelectContent>
            {(dictionary.contactForm?.subjects ?? DEFAULT_SUBJECTS).map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.subject && <p className="text-xs text-destructive">{errors.subject.message}</p>}
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="message">
          {contactForm.message} <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          rows={5}
          placeholder={contactForm.placeholder.message}
          {...register('message')}
        />
        {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
      </div>

      <div className="mt-5 flex items-start gap-2.5">
        <input
          id="consent"
          type="checkbox"
          checked={consentValue}
          {...register('consent')}
          className="mt-1 h-4 w-4 rounded border-input accent-primary"
        />
        <Label htmlFor="consent" className="text-sm font-normal text-muted-foreground">
          {contactForm.consent}
        </Label>
      </div>
      {errors.consent && <p className="mt-1 text-xs text-destructive">{errors.consent.message}</p>}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full bg-primary sm:w-auto"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {contactForm.sending}
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            {contactForm.sendMessage}
          </>
        )}
      </Button>
    </form>
  );
}