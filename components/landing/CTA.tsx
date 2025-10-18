import Link from 'next/link';
import { CTAConfig } from '@/types/landing';

interface CTAProps {
  config: CTAConfig;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function CTA({ config, size = 'md', fullWidth = false }: CTAProps) {
  const { label, href, variant, ariaLabel } = config;

  // Base styles
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  // Size variants
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg'
  };

  // Color variants
  const variantStyles = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200',
    secondary: 'border-2 border-slate-900 text-slate-900 hover:bg-slate-50 focus:ring-slate-900 dark:border-slate-50 dark:text-slate-50 dark:hover:bg-slate-900',
    ghost: 'text-slate-700 hover:bg-slate-100 focus:ring-slate-500 dark:text-slate-300 dark:hover:bg-slate-800'
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
