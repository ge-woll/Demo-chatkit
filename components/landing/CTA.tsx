import Link from 'next/link';
import { CTAConfig } from '@/types/landing';

interface CTAProps {
  config: CTAConfig;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function CTA({ config, size = 'md', fullWidth = false }: CTAProps) {
  const { label, href, variant, ariaLabel } = config;

  // Base styles with enhanced transitions and hover effects
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-2';

  // Size variants with larger touch targets for mobile
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm min-h-10',
    md: 'px-8 py-3 text-base min-h-11',
    lg: 'px-10 py-4 text-lg min-h-12'
  };

  // Color variants with enhanced hover and focus states
  const variantStyles = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg focus:ring-slate-400 active:bg-slate-950 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200 dark:hover:shadow-xl dark:focus:ring-slate-600',
    secondary: 'border-2 border-slate-900 text-slate-900 hover:bg-slate-50 hover:border-slate-700 hover:shadow-md focus:ring-slate-400 dark:border-slate-50 dark:text-slate-50 dark:hover:bg-slate-900 dark:hover:border-slate-200',
    ghost: 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-300 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50'
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  const className = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle}`.trim();

  // Handle anchor links (e.g., #features) vs route links
  if (href.startsWith('#')) {
    return (
      <a
        href={href}
        className={className}
        aria-label={ariaLabel || label}
        onClick={(e) => {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel || label}
    >
      {label}
    </Link>
  );
}
