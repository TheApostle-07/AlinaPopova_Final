'use client';

import Link from 'next/link';
import type { Route } from 'next';
import type { UrlObject } from 'url';
import { motion, type HTMLMotionProps } from 'framer-motion';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

const variants = {
  primary: 'bg-primary text-ivory shadow-sm hover:bg-[#78404c] hover:text-ivory',
  secondary: 'border border-primary bg-ivory text-primary hover:bg-blush/20 hover:text-primary',
  ghost: 'bg-transparent text-primary hover:bg-blush/20'
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
    'inline-flex min-h-12 items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition-[background-color,color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-50',
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
