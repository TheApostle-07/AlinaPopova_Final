import Image from 'next/image';
import clsx from 'clsx';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  compact?: boolean;
}

export const BrandLogo = ({ variant = 'dark', className, compact = false }: BrandLogoProps) => {
  const isLight = variant === 'light';

  return (
    <span className={clsx('inline-flex items-center gap-3', className)}>
      <span
        className={clsx(
          'relative shrink-0 overflow-hidden',
          compact ? 'h-9 w-9 rounded-xl' : 'h-10 w-10 rounded-2xl',
          isLight
            ? 'border border-white/10 bg-[#282527] p-px shadow-[0_18px_50px_rgba(0,0,0,0.18)]'
            : 'border border-black/[0.06] bg-[#282527] p-px'
        )}
      >
        <Image src="/AP_Logo_2.png" alt="" fill sizes={compact ? '36px' : '40px'} className="object-cover" priority={!isLight} />
      </span>
      <span className="min-w-0 leading-tight">
        <span className={clsx('block whitespace-nowrap font-semibold', compact ? 'text-sm' : 'text-[15px] sm:text-base', isLight ? 'text-white' : 'text-espresso')}>
          Alina Popova Studio
        </span>
        <span className={clsx('mt-0.5 block whitespace-nowrap font-medium', compact ? 'text-[11px]' : 'text-xs', isLight ? 'text-white/60' : 'text-cocoa')}>
          Creator Marketing Studio
        </span>
      </span>
    </span>
  );
};
