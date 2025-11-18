'use client';

import Link from 'next/link';
import type { Route } from 'next';
import type { UrlObject } from 'url';
import { motion } from 'framer-motion';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

const MotionLink = motion(Link);

const variants = {
  primary: 'bg-primary text-white shadow shadow-primary/20 hover:bg-primary/90 hover:text-white',
  secondary: 'bg-slate-100 text-foreground hover:bg-slate-200',
  ghost: 'bg-transparent text-foreground hover:bg-slate-100'
};

type BaseProps = {
  variant?: keyof typeof variants;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
};

type ButtonLikeProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkLikeProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: Route | UrlObject };

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
    'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    className
  );

  if (href) {
    const linkProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <MotionLink
        href={href}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        {...linkProps}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </motion.button>
  );
};
