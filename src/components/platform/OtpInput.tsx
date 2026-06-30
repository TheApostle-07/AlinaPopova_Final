'use client';

import { useEffect, useRef } from 'react';

export function OtpInput({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled = false,
  error = false,
  describedBy
}: {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  describedBy?: string;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, index) => value[index] ?? '');

  useEffect(() => {
    if (value.length === length) {
      const timeout = window.setTimeout(() => onComplete?.(value), 320);
      return () => window.clearTimeout(timeout);
    }
    return undefined;
  }, [length, onComplete, value]);

  const setValueAt = (index: number, digit: string) => {
    const next = digits.slice();
    next[index] = digit;
    const nextValue = next.join('').replace(/\D/g, '').slice(0, length);
    onChange(nextValue);
    if (digit && index < length - 1) refs.current[index + 1]?.focus();
  };

  const handleChange = (index: number, raw: string) => {
    const clean = raw.replace(/\D/g, '');
    if (!clean) {
      setValueAt(index, '');
      return;
    }
    if (clean.length > 1) {
      const nextValue = (value.slice(0, index) + clean).replace(/\D/g, '').slice(0, length);
      onChange(nextValue);
      refs.current[Math.max(0, Math.min(nextValue.length, length) - 1)]?.focus();
      return;
    }
    setValueAt(index, clean);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const clean = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!clean) return;
    onChange(clean);
    refs.current[Math.max(0, Math.min(clean.length, length) - 1)]?.focus();
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      event.preventDefault();
      if (digits[index]) {
        setValueAt(index, '');
      } else if (index > 0) {
        const next = digits.slice();
        next[index - 1] = '';
        onChange(next.join(''));
        refs.current[index - 1]?.focus();
      }
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      refs.current[index - 1]?.focus();
    }
    if (event.key === 'ArrowRight' && index < length - 1) {
      event.preventDefault();
      refs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-3" aria-label="Verification code">
      {digits.map((digit, index) => (
        <input
          key={`otp-${index}`}
          ref={(node) => {
            refs.current[index] = node;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of ${length}`}
          aria-invalid={error}
          aria-describedby={describedBy}
          onChange={(event) => handleChange(index, event.target.value)}
          onPaste={handlePaste}
          onKeyDown={(event) => handleKeyDown(index, event)}
          className={[
            'h-12 w-[42px] rounded-2xl border bg-white text-center text-xl font-semibold text-[#111014] outline-none transition sm:h-14 sm:w-[52px] sm:text-2xl',
            error
              ? 'border-merlot/45 shadow-[0_0_0_4px_rgba(125,42,65,0.08)]'
              : 'border-[#ECE8EC] focus:border-[#C73572] focus:shadow-[0_0_0_4px_rgba(199,53,114,0.10)]',
            disabled ? 'cursor-not-allowed opacity-60' : ''
          ].join(' ')}
        />
      ))}
    </div>
  );
}
