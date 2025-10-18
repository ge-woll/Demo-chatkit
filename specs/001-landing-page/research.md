# Research & Technical Decisions: Landing Page

**Feature**: Modern Landing Page for Judgment Summariser
**Date**: 2025-10-18
**Purpose**: Resolve technical unknowns and document design decisions

## Research Areas

### 1. Testing Strategy for Next.js Landing Page

**Context**: The project currently has no testing framework configured in package.json. Need to determine appropriate testing approach for the landing page.

**Decision**: Use Playwright for end-to-end testing + React Testing Library for component testing

**Rationale**:
1. **Playwright for E2E**:
   - Already supported by the MCP (Model Context Protocol) integration in the project
   - Excellent for testing landing page user journeys (P1-P4 user stories)
   - Can validate accessibility, responsive design, and visual regression
   - Perfect for testing CTA clicks, navigation flows, and cross-browser compatibility
   - Supports automated Lighthouse audits for performance metrics

2. **React Testing Library (RTL) for Components**:
   - Industry standard for React component testing
   - Promotes accessibility-focused testing (aligns with WCAG 2.1 AA requirement)
   - Lightweight and integrates well with Jest
   - Can test individual landing components (Hero, Features, CTA) in isolation

3. **Jest as Test Runner**:
   - De facto standard for React/Next.js projects
   - Built-in to Next.js (no additional configuration needed)
   - Supports coverage reports

**Alternatives Considered**:
- **Cypress**: More established but heavier than Playwright, less modern API
- **Vitest**: Faster than Jest but requires additional setup, less ecosystem support for Next.js
- **No testing**: Rejected due to WCAG compliance requirements and need for cross-browser validation

**Implementation**:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom
```

**Testing Priorities**:
1. E2E: User story flows (P1-P4 from spec)
2. E2E: Accessibility audits (WCAG 2.1 AA)
3. E2E: Performance metrics (Lighthouse, Core Web Vitals)
4. E2E: Cross-browser/device compatibility
5. Component: Hero, Features, CTA render correctly
6. Component: Responsive breakpoints work as expected

---

### 2. Landing Page Content Strategy

**Context**: Need to define specific headline, copy, and feature descriptions for the judgment summariser landing page.

**Decision**: Use benefit-driven messaging focused on time savings for legal professionals

**Rationale**:
1. **Target Audience**: Legal professionals (lawyers, paralegals, law students) value time efficiency
2. **Core Value Proposition**: Judgment summarisation directly addresses legal research pain points
3. **Industry Patterns**: Successful legal tech landing pages emphasize time/cost savings first, features second

**Recommended Content Structure**:

**Hero Section**:
- **Headline**: "Summarize Legal Judgments in Seconds, Not Hours"
- **Subheadline**: "AI-powered judgment analysis for legal professionals. Get instant summaries of court decisions, key findings, and precedents."
- **Primary CTA**: "Try Free Now" or "Start Summarizing"
- **Secondary CTA**: "See How It Works" (scroll to features)

**Features Section** (3-5 key benefits):
1. **Instant Summaries**: "Upload a judgment and receive a comprehensive summary in seconds"
2. **Key Points Extraction**: "Automatically identifies holdings, reasoning, and precedents"
3. **Time Savings**: "Reduce case research time by up to 80%"
4. **Accurate & Reliable**: "Powered by OpenAI's advanced language models"
5. **Simple Interface**: "No training required - just upload and summarize"

**Social Proof** (future enhancement):
- Testimonials from legal professionals
- Usage statistics (e.g., "Trusted by 10,000+ legal professionals")

**Alternatives Considered**:
- **Feature-first messaging**: Less effective - users need to understand "why" before "what"
- **Technical focus**: Avoided - spec explicitly requires non-technical stakeholder language
- **Long-form content**: Rejected - spec requires 10-second value comprehension

**Content Configuration**:
Content will be stored in `lib/landing-content.ts` for easy updates without touching components:

```typescript
export const landingContent = {
  hero: {
    headline: "Summarize Legal Judgments in Seconds, Not Hours",
    subheadline: "AI-powered judgment analysis for legal professionals...",
    primaryCTA: "Try Free Now",
    secondaryCTA: "See How It Works"
  },
  features: [
    { title: "Instant Summaries", description: "...", icon: "clock" },
    // ...
  ]
}
```

---

### 3. Responsive Design Breakpoints

**Context**: Need to define specific breakpoints for mobile (320px+), tablet, and desktop to meet FR-004.

**Decision**: Use Tailwind CSS default breakpoints with mobile-first approach

**Rationale**:
1. **Tailwind Defaults Align with Industry Standards**:
   - `sm: 640px` - Large phones/small tablets
   - `md: 768px` - Tablets
   - `lg: 1024px` - Laptops
   - `xl: 1280px` - Desktops
   - `2xl: 1536px` - Large desktops

2. **Mobile-First Approach**:
   - Base styles target 320px+ (iPhone SE, smallest common device)
   - Progressive enhancement for larger screens
   - Aligns with performance goals (mobile optimization first)

3. **Existing Project Patterns**:
   - Project already uses Tailwind CSS 4
   - Maintains consistency with existing ChatKitPanel component styling

**Implementation Guidelines**:
- **320px-639px (Mobile)**: Single column layout, stacked content, large touch targets (min 44px)
- **640px-767px (Large Mobile)**: Slightly larger typography, maintained single column
- **768px-1023px (Tablet)**: Two-column layouts for features, larger hero images
- **1024px+ (Desktop)**: Multi-column layouts, side-by-side hero content, maximum content width 1280px

**Key Component Breakpoints**:
```tsx
// Hero: Stack on mobile, side-by-side on desktop
<section className="flex flex-col lg:flex-row">
  <div className="lg:w-1/2">Headline</div>
  <div className="lg:w-1/2">Image</div>
</section>

// Features: 1 col mobile, 2 col tablet, 3 col desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

**Alternatives Considered**:
- **Custom breakpoints**: Unnecessary complexity, Tailwind defaults cover 95%+ devices
- **Desktop-first**: Rejected - mobile traffic increasingly dominant
- **Fixed-width design**: Rejected - spec requires full responsiveness

---

### 4. Accessibility Implementation Strategy

**Context**: Landing page must meet WCAG 2.1 Level AA standards (FR-008, SC-006).

**Decision**: Implement accessibility through semantic HTML, ARIA labels, keyboard navigation, and automated testing

**Rationale**:
1. **WCAG 2.1 Level AA Requirements**:
   - Sufficient color contrast (4.5:1 for normal text, 3:1 for large text)
   - Keyboard navigation for all interactive elements
   - Screen reader compatibility
   - Alternative text for images
   - Proper heading hierarchy

2. **Built-in Next.js/React Features**:
   - Next.js Image component provides automatic alt text enforcement
   - React semantic HTML encourages accessible markup
   - Tailwind CSS provides accessible focus states out of the box

3. **Testing Integration**:
   - Playwright can run Lighthouse accessibility audits automatically
   - axe-core integration for automated WCAG testing
   - Manual keyboard navigation testing in E2E tests

**Implementation Checklist**:

**Color Contrast**:
- Use Tailwind's default color palette (pre-tested for contrast)
- Primary CTA: High contrast background (e.g., slate-900 text on white, white text on slate-900)
- Verify all text meets 4.5:1 ratio using contrast checker

**Semantic HTML**:
```tsx
<main>
  <section aria-labelledby="hero-heading">
    <h1 id="hero-heading">Headline</h1>
  </section>
  <section aria-labelledby="features-heading">
    <h2 id="features-heading">Features</h2>
  </section>
</main>
```

**Keyboard Navigation**:
- All CTAs must be `<button>` or `<a>` elements (not `<div>` with onClick)
- Visible focus indicators on all interactive elements
- Logical tab order (top to bottom, left to right)
- Skip-to-content link for screen readers

**Screen Reader Support**:
- Descriptive aria-labels for icon-only buttons
- Image alt text describes content (not "image" or "photo")
- Proper heading hierarchy (single h1, logical h2/h3 structure)

**Testing Approach**:
```typescript
// Playwright E2E test
test('landing page meets WCAG AA standards', async ({ page }) => {
  await page.goto('/landing');

  // Run Lighthouse accessibility audit
  const report = await lighthouse(page.url());
  expect(report.accessibility).toBeGreaterThanOrEqual(90);

  // Test keyboard navigation
  await page.keyboard.press('Tab');
  const focusedElement = await page.locator(':focus');
  expect(focusedElement).toBeVisible();
});
```

**Tools**:
- **axe DevTools**: Browser extension for manual testing
- **Lighthouse**: Automated accessibility scoring
- **NVDA/VoiceOver**: Manual screen reader testing
- **Wave**: Visual accessibility checker

**Alternatives Considered**:
- **ARIA-heavy approach**: Rejected - semantic HTML preferred, ARIA only when necessary
- **Accessibility overlay widgets**: Rejected - band-aid solution, not real compliance
- **WCAG AAA**: Rejected - AA is industry standard, AAA often impractical

---

### 5. Visual Design Assets & Icons

**Context**: Landing page requires modern, professional visual elements (FR-009, FR-011) but no design assets currently exist.

**Decision**: Use Heroicons for icons, Unsplash for placeholder hero images, custom illustrations optional

**Rationale**:
1. **Heroicons**:
   - Free, MIT licensed, designed by Tailwind Labs
   - Consistent with Tailwind CSS design language
   - Available as React components (@heroicons/react)
   - Professional, minimal aesthetic suitable for legal tech

2. **Unsplash/Pexels for Hero Images**:
   - Free high-quality stock photos
   - Professional legal-themed imagery available
   - Can be replaced with custom photography later
   - Properly licensed for commercial use

3. **Optional Custom Illustrations**:
   - Can use unDraw or similar for feature illustrations
   - Not critical for MVP - icons + text sufficient
   - Future enhancement opportunity

**Icon Recommendations**:
- **Instant Summaries**: ClockIcon or BoltIcon
- **Key Points Extraction**: DocumentSearchIcon or LightBulbIcon
- **Time Savings**: ChartBarIcon or TrendingUpIcon
- **Accurate & Reliable**: CheckBadgeIcon or ShieldCheckIcon
- **Simple Interface**: CursorArrowRaysIcon or SparklesIcon

**Installation**:
```bash
npm install @heroicons/react
```

**Usage**:
```tsx
import { ClockIcon } from '@heroicons/react/24/outline';

<ClockIcon className="h-12 w-12 text-slate-700" />
```

**Image Optimization**:
- Use Next.js `<Image>` component for automatic optimization
- Lazy load below-the-fold images
- Serve WebP format with JPEG fallback
- Responsive images with srcSet

**Alternatives Considered**:
- **Font Awesome**: Bloated, requires additional loading
- **Custom SVGs**: Time-consuming, inconsistent unless design system exists
- **Lucide Icons**: Good alternative but less ecosystem integration with Tailwind
- **No icons**: Rejected - visual elements required by spec (FR-009)

---

### 6. Performance Optimization Strategy

**Context**: Landing page must load in <3 seconds (SC-003, FR-007) and achieve Lighthouse 90+ (SC-005).

**Decision**: Use Next.js static generation, image optimization, and minimal JavaScript

**Rationale**:
1. **Static Site Generation (SSG)**:
   - Landing page content is static (no user-specific data)
   - Pre-renders at build time for instant delivery
   - Next.js default export for pages without getServerSideProps
   - Can be cached on CDN for global distribution

2. **Image Optimization**:
   - Next.js `<Image>` component provides automatic optimization
   - Modern formats (WebP, AVIF) with fallbacks
   - Responsive images based on device
   - Lazy loading for below-the-fold content

3. **Minimal JavaScript**:
   - No heavy client-side libraries required
   - CTA clicks are simple navigation (no complex interactions)
   - Smooth scrolling can use CSS scroll-behavior
   - Total JS bundle target: <100KB gzipped

4. **Tailwind CSS Optimization**:
   - Tailwind v4 includes built-in PostCSS optimization
   - Unused CSS automatically purged
   - Critical CSS inlined automatically by Next.js

5. **Font Optimization**:
   - Use Next.js font optimization (next/font)
   - System fonts as fallback for instant rendering
   - Preload critical fonts

**Performance Budget**:
- Time to First Byte (TTFB): <200ms
- First Contentful Paint (FCP): <1.5s
- Largest Contentful Paint (LCP): <2.5s
- Cumulative Layout Shift (CLS): <0.1
- First Input Delay (FID): <100ms
- Total Page Size: <500KB
- JavaScript Bundle: <100KB gzipped
- Images: <300KB total (optimized)

**Implementation**:
```tsx
// pages/landing/page.tsx
export default function LandingPage() {
  // Statically generated at build time
  return <LandingContent />;
}

// Image optimization
import Image from 'next/image';
<Image
  src="/landing/hero.jpg"
  alt="Legal professional reviewing documents"
  width={1200}
  height={800}
  priority // Above fold
  placeholder="blur"
/>

// Font optimization
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
```

**Monitoring**:
- Lighthouse CI in GitHub Actions for every PR
- Real User Monitoring (RUM) via Vercel Analytics
- Core Web Vitals tracking in production

**Alternatives Considered**:
- **Server-side rendering (SSR)**: Unnecessary for static content, adds latency
- **Client-side rendering (CSR)**: Poor performance, SEO issues
- **Incremental Static Regeneration (ISR)**: Overkill for landing page that rarely changes

---

## Summary of Technical Decisions

| Area | Decision | Key Technology |
|------|----------|----------------|
| **Testing** | Playwright (E2E) + React Testing Library (component) | @playwright/test, @testing-library/react |
| **Content Management** | Configuration file approach | TypeScript config in lib/landing-content.ts |
| **Responsive Design** | Tailwind default breakpoints, mobile-first | Tailwind CSS 4, 320px minimum |
| **Accessibility** | Semantic HTML + automated testing | Lighthouse, axe-core, keyboard nav |
| **Visual Assets** | Heroicons + Unsplash images | @heroicons/react, Next.js Image |
| **Performance** | Static generation + image optimization | Next.js SSG, <Image>, font optimization |

## Dependencies to Add

```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0"
  },
  "dependencies": {
    "@heroicons/react": "^2.0.0"
  }
}
```

**Note**: Playwright is already available via MCP integration, no additional installation needed.

## Next Steps

With all technical unknowns resolved, proceed to:
1. ✅ Phase 1: Generate design artifacts (data-model.md, quickstart.md)
2. ✅ Update agent context with new technology stack
3. ✅ Generate tasks.md with `/speckit.tasks`
