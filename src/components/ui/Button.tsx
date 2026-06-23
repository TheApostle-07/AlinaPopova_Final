'use client';

import Link from 'next/link';
import type { Route } from 'next';
import type { UrlObject } from 'url';
import { motion, type HTMLMotionProps } from 'framer-motion';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';

const variants = {
  primary: 'border border-transparent bg-primary text-white shadow-[0_10px_28px_rgba(168,36,92,0.18)] hover:bg-[#A8245C] hover:text-white hover:shadow-[0_16px_34px_rgba(168,36,92,0.22)]',
  secondary: 'border border-[#E7E1E5] bg-white text-espresso shadow-[0_8px_22px_rgba(17,16,20,0.04)] hover:border-primary/30 hover:bg-porcelain hover:text-espresso hover:shadow-[0_12px_28px_rgba(17,16,20,0.07)]',
  ghost: 'min-h-0 rounded-none bg-transparent px-0 py-1.5 text-primary shadow-none hover:bg-transparent hover:text-[#A8245C] hover:shadow-none'
};

const sizes = {
  sm: 'min-h-10 px-4 py-2 text-[0.8125rem]',
  md: 'min-h-12 px-5 py-3 text-sm',
  lg: 'min-h-14 px-7 py-3.5 text-base'
};

type BaseProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  showArrow?: boolean;
  children: ReactNode;
};

type ButtonLikeProps = BaseProps &
  Omit<HTMLMotionProps<'button'>, keyof BaseProps | 'href' | 'children' | 'ref'> & { href?: undefined };
type LinkLikeProps = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: Route | UrlObject | string };

export type ButtonProps = ButtonLikeProps | LinkLikeProps;

export const Button = (props: ButtonProps) => {
  const { href, variant = 'primary', size = 'md', className, iconLeft, iconRight, fullWidth = false, showArrow, children, ...rest } = props;
  const inferredArrow = Boolean(href) && (variant === 'primary' || variant === 'ghost') && iconRight === undefined;
  const trailingIcon = iconRight ?? ((showArrow ?? inferredArrow) ? <ArrowRight className="h-4 w-4 shrink-0" aria-hidden /> : null);
  const content = (
    <span className="flex items-center gap-2 [&>svg:last-child]:transition-transform group-hover:[&>svg:last-child]:translate-x-0.5 group-hover:[&>svg:last-child]:-translate-y-0.5">
      {iconLeft}
      <span>{children}</span>
      {trailingIcon}
    </span>
  );

  const classes = clsx(
    'group inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold no-underline transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  );

  if (href) {
    const linkProps = rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;
    const isExternal = typeof href === 'string' && /^(https?:|mailto:|tel:)/.test(href);
    if (isExternal) {
      return <a href={href} className={classes} {...linkProps}>{content}</a>;
    }
    return (
      <Link
        href={href as Route | UrlObject}
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
      whileHover={variant === 'ghost' ? undefined : { y: -1 }}
      whileTap={variant === 'ghost' ? undefined : { scale: 0.985 }}
      {...(rest as Omit<HTMLMotionProps<'button'>, 'ref'>)}
    >
      {content}
    </motion.button>
  );
};
