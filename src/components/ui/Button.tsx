'use client';

import Link from 'next/link';
import type { Route } from 'next';
import type { UrlObject } from 'url';
import { motion, type HTMLMotionProps } from 'framer-motion';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

const variants = {
  primary: 'bg-primary text-white shadow-[0_8px_24px_rgba(17,16,20,0.08)] hover:bg-[#A8245C] hover:text-white hover:shadow-card',
  secondary: 'border border-[#ECE8EC] bg-white text-espresso shadow-[0_8px_20px_rgba(17,16,20,0.04)] hover:border-primary/25 hover:bg-porcelain hover:text-primary',
  ghost: 'bg-transparent text-primary hover:bg-porcelain'
};

type BaseProps = {
  variant?: keyof typeof variants;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
};

type ButtonLikeProps = BaseProps &
  Omit<HTMLMotionProps<'button'>, keyof BaseProps | 'href' | 'children' | 'ref'> & { href?: undefined };
type LinkLikeProps = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: Route | UrlObject };

export type ButtonProps = ButtonLikeProps | LinkLikeProps;

export const Button = (props: ButtonProps) => {
  const { href, variant = 'primary', className, iconLeft, iconRight, children, ...rest } = props;
  const content = (
    <span className="flex items-center gap-2">
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </span>
  );

  const classes = clsx(
    'inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-[background-color,color,box-shadow,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    className
  );

  if (href) {
    const linkProps = rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;
    return (
      <Link
        href={href}
        className={classes}
        {...linkProps}
      >
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...(rest as Omit<HTMLMotionProps<'button'>, 'ref'>)}
    >
      {content}
    </motion.button>
  );
};
