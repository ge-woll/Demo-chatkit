# Data Model: Landing Page

**Feature**: Modern Landing Page for Judgment Summariser
**Date**: 2025-10-18

## Overview

The landing page is a **static, content-driven feature** with no persistent data storage or complex data models. This document describes the content structure and configuration data used by the landing page components.

## Content Configuration Model

### LandingContent

The landing page content is managed through a TypeScript configuration object located at `lib/landing-content.ts`.

**Purpose**: Centralize all copy, CTAs, and feature descriptions for easy content updates without touching component code.

**Structure**:

```typescript
interface HeroContent {
  headline: string;           // Primary value proposition (h1)
  subheadline: string;        // Supporting description
  primaryCTA: CTAConfig;      // Main call-to-action
  secondaryCTA?: CTAConfig;   // Optional secondary action
  heroImage?: ImageConfig;    // Optional hero visual
}

interface CTAConfig {
  label: string;              // Button text
  href: string;               // Navigation target
  variant: 'primary' | 'secondary' | 'ghost';
  ariaLabel?: string;         // Accessibility label
}

interface ImageConfig {
  src: string;                // Image path
  alt: string;                // Alternative text (accessibility)
  width: number;              // Image dimensions
  height: number;
}

interface FeatureItem {
  id: string;                 // Unique identifier
  title: string;              // Feature headline
  description: string;        // Feature explanation
  icon: string;               // Heroicon name (e.g., 'ClockIcon')
  order: number;              // Display order
}

interface LandingContent {
  hero: HeroContent;
  features: FeatureItem[];
  benefits?: string[];        // Optional bullet points
  footer?: FooterContent;     // Optional footer configuration
}
```

**Example Configuration**:

```typescript
// lib/landing-content.ts
export const landingContent: LandingContent = {
  hero: {
    headline: "Summarize Legal Judgments in Seconds, Not Hours",
    subheadline: "AI-powered judgment analysis for legal professionals. Get instant summaries of court decisions, key findings, and precedents.",
    primaryCTA: {
      label: "Try Free Now",
      href: "/app",
      variant: "primary",
      ariaLabel: "Start using the judgment summariser"
    },
    secondaryCTA: {
      label: "See How It Works",
      href: "#features",
      variant: "secondary",
      ariaLabel: "Scroll to features section"
    },
    heroImage: {
      src: "/landing/hero-legal.jpg",
      alt: "Legal professional reviewing court documents on laptop",
      width: 1200,
      height: 800
    }
  },
  features: [
    {
      id: "instant-summaries",
      title: "Instant Summaries",
      description: "Upload a judgment and receive a comprehensive summary in seconds. No more hours of manual reading.",
      icon: "ClockIcon",
      order: 1
    },
    {
      id: "key-points",
      title: "Key Points Extraction",
      description: "Automatically identifies holdings, legal reasoning, and precedents. Focus on what matters.",
      icon: "DocumentSearchIcon",
      order: 2
    },
    {
      id: "time-savings",
      title: "Save 80% of Research Time",
      description: "Reduce case research time dramatically. Get back to practicing law instead of reading documents.",
      icon: "ChartBarIcon",
      order: 3
    }
  ]
};
```

## Component Props Models

### Hero Component Props

```typescript
interface HeroProps {
  content: HeroContent;
  theme?: 'light' | 'dark';
}
```

### Features Component Props

```typescript
interface FeaturesProps {
  features: FeatureItem[];
  layout?: 'grid' | 'list';  // Default: 'grid'
  columns?: 1 | 2 | 3;       // Grid columns (responsive)
}
```

### CTA Component Props

```typescript
interface CTAProps {
  config: CTAConfig;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}
```

## Navigation State

The landing page may track minimal client-side state for UI enhancements:

```typescript
interface LandingPageState {
  scrollPosition: number;      // For sticky header behavior
  activeSection: string;        // For scroll-spy navigation (optional)
  ctaClicked: boolean;         // For analytics tracking
}
```

**Note**: This state is ephemeral (not persisted) and only exists during the page session.

## Analytics Events

While not a "data model" per se, the landing page will emit events for tracking:

```typescript
interface AnalyticsEvent {
  eventName: string;
  properties: {
    ctaLabel?: string;
    scrollDepth?: number;
    timestamp: Date;
  };
}

// Example events:
// - "landing_page_view"
// - "cta_clicked" { ctaLabel: "Try Free Now" }
// - "feature_section_viewed"
// - "scroll_depth_50"
```

## No Backend Data Models

**Important**: The landing page has **NO**:
- Database tables or schemas
- API endpoints (beyond existing ChatKit session endpoint)
- User data persistence
- Form submissions (CTAs are navigation links)
- Authentication or session management

All content is static and configured at build time. Any dynamic behavior (e.g., A/B testing, personalization) would be added in future iterations.

## Related Files

- `lib/landing-content.ts` - Content configuration
- `components/landing/Hero.tsx` - Hero component consuming HeroContent
- `components/landing/Features.tsx` - Features component consuming FeatureItem[]
- `components/landing/CTA.tsx` - Reusable CTA button component

## Future Considerations

If the landing page evolves to include dynamic features, consider:

1. **Lead Capture Form**: Would require email validation, database storage
2. **A/B Testing**: Would require variant storage, analytics integration
3. **Localization**: Would require content in multiple languages
4. **Personalization**: Would require user preferences, cookie storage

For now, these are out of scope (YAGNI principle).
