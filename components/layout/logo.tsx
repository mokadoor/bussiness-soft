import { cn } from '@/lib/utils';

export function Logo({
  className,
  variant = 'default',
}: {
  className?: string;
  variant?: 'default' | 'light';
}) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-md">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 text-white"
          aria-hidden="true"
        >
          <path
            d="M4 7l8-4 8 4-8 4-8-4z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M4 12l8 4 8-4M4 17l8 4 8-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            opacity="0.6"
          />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            'text-base font-bold tracking-tight',
            variant === 'light' ? 'text-white' : 'text-foreground'
          )}
        >
          Business<span className="text-accent">Software</span>
        </span>
        <span
          className={cn(
            'text-[10px] font-medium uppercase tracking-[0.2em]',
            variant === 'light' ? 'text-white/60' : 'text-muted-foreground'
          )}
        >
          Tunisia
        </span>
      </div>
    </div>
  );
}
