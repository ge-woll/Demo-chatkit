// TypeScript types for landing page content

export interface CTAConfig {
  label: string;              // Button text
  href: string;               // Navigation target
  variant: 'primary' | 'secondary' | 'ghost';
  ariaLabel?: string;         // Accessibility label
}

export interface ImageConfig {
  src: string;                // Image path
  alt: string;                // Alternative text (accessibility)
  width: number;              // Image dimensions
  height: number;
}

export interface HeroContent {
  headline: string;           // Primary value proposition (h1)
  subheadline: string;        // Supporting description
  primaryCTA: CTAConfig;      // Main call-to-action
  secondaryCTA?: CTAConfig;   // Optional secondary action
  heroImage?: ImageConfig;    // Optional hero visual
}

export interface FeatureItem {
  id: string;                 // Unique identifier
  title: string;              // Feature headline
  description: string;        // Feature explanation
  icon: string;               // Heroicon name (e.g., 'ClockIcon')
  order: number;              // Display order
}

export interface FooterContent {
  copyright?: string;
  links?: Array<{ label: string; href: string }>;
}

export interface LandingContent {
  hero: HeroContent;
  features: FeatureItem[];
  benefits?: string[];        // Optional bullet points
  footer?: FooterContent;     // Optional footer configuration
}
