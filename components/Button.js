'use client';

import React from 'react';
import Link from 'next/link';

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary shadow-sm hover:shadow-md',
    secondary: 'bg-secondary text-white hover:bg-secondary-hover focus:ring-secondary shadow-sm hover:shadow-md',
    outline: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 focus:ring-slate-400',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-300',
    danger: 'bg-danger text-white hover:bg-danger-hover focus:ring-danger shadow-sm hover:shadow-md',
    dangerOutline: 'border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 focus:ring-red-400',
    success: 'bg-success text-white hover:bg-success-hover focus:ring-success shadow-sm hover:shadow-md',
    subtle: 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-400',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
}

