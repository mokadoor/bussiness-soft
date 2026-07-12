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

const schema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  company: z.string().optional(),
  subject: z.string().min(2, 'Please select a subject'),
  message: z.string().min(10, 'Please tell us a bit more (at least 10 characters)'),
  consent: z.boolean().refine((v) => v, 'You must agree to be contacted'),
});

type FormValues = z.infer<typeof schema>;

const subjects = [
  'Request a demo',
  'ERP Consulting',
  'Custom Software Development',
  'ERP Implementation',
  'Technical Support',
  'Partnership',
  'Other',
];

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);

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
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitted(true);
      reset();
      toast.success('Message sent!', {
        description: "We'll get back to you within one business day.",
      });
    } catch {
      toast.error('Something went wrong', {
        description: 'Please try again or email us directly.',
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-background p-10 text-center shadow-card">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        </div>
        <h3 className="mt-5 text-xl font-semibold tracking-tight">Thank you!</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Your message has been received. Our team will get back to you within one business day.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Send another message
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
            Full name <span className="text-destructive">*</span>
          </Label>
          <Input id="name" placeholder="John Doe" {...register('name')} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input id="email" type="email" placeholder="john@company.com" {...register('email')} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone <span className="text-destructive">*</span>
          </Label>
          <Input id="phone" placeholder="+216 71 000 000" {...register('phone')} />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" placeholder="Your company" {...register('company')} />
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="subject">
          Subject <span className="text-destructive">*</span>
        </Label>
        <Select
          value={subjectValue}
          onValueChange={(v) => setValue('subject', v, { shouldValidate: true })}
        >
          <SelectTrigger id="subject" className="w-full">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((s) => (
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
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Tell us about your project or question..."
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
          I agree to be contacted by Business Software TN regarding my inquiry.
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
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
