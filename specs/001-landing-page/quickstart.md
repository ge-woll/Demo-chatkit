# Quickstart Guide: Landing Page Development

**Feature**: Modern Landing Page for Judgment Summariser
**Branch**: `001-landing-page`
**Estimated Setup Time**: 10 minutes

## Prerequisites

- Node.js 18+ installed
- Git repository cloned
- Existing Next.js project running (verified with `npm run dev`)

## Quick Setup (5 Minutes)

### 1. Install Dependencies

```bash
# Add testing libraries
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom

# Add icon library
npm install @heroicons/react
```

### 2. Create Directory Structure

```bash
# Create landing page directories
mkdir -p app/landing
mkdir -p components/landing
mkdir -p public/landing/icons

# Create content configuration
touch lib/landing-content.ts
```

### 3. Verify Existing Setup

The landing page leverages existing project infrastructure:

- ✅ **Next.js 15.5.4**: Already configured
- ✅ **Tailwind CSS 4**: Already configured (`postcss.config.mjs`, existing styles)
- ✅ **TypeScript 5**: Already configured (`tsconfig.json`)
- ✅ **React 19**: Already installed

No additional framework setup required!

## Development Workflow

### Step 1: Create Landing Content Configuration

Create `lib/landing-content.ts`:

```typescript
import { LandingContent } from '@/types/landing';

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
      variant: "secondary"
    }
  },
  features: [
    {
      id: "instant-summaries",
      title: "Instant Summaries",
      description: "Upload a judgment and receive a comprehensive summary in seconds.",
      icon: "ClockIcon",
      order: 1
    },
    {
      id: "key-points",
      title: "Key Points Extraction",
      description: "Automatically identifies holdings, legal reasoning, and precedents.",
      icon: "DocumentSearchIcon",
      order: 2
    },
    {
      id: "time-savings",
      title: "Save 80% of Research Time",
      description: "Reduce case research time dramatically.",
      icon: "ChartBarIcon",
      order: 3
    }
  ]
};
```

### Step 2: Build Landing Page Components

#### 2a. Hero Component

Create `components/landing/Hero.tsx`:

```tsx
import { landingContent } from '@/lib/landing-content';
import Link from 'next/link';

export function Hero() {
  const { hero } = landingContent;

  return (
    <section
      className="flex min-h-[600px] flex-col items-center justify-center px-4 py-16 lg:flex-row lg:px-8"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-2xl text-center lg:text-left">
        <h1
          id="hero-heading"
          className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl lg:text-6xl"
        >
          {hero.headline}
        </h1>
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
          {hero.subheadline}
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href={hero.primaryCTA.href}
            className="rounded-lg bg-slate-900 px-8 py-3 text-center font-semibold text-white hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
            aria-label={hero.primaryCTA.ariaLabel}
          >
            {hero.primaryCTA.label}
          </Link>
          {hero.secondaryCTA && (
            <Link
              href={hero.secondaryCTA.href}
              className="rounded-lg border-2 border-slate-900 px-8 py-3 text-center font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-50 dark:text-slate-50 dark:hover:bg-slate-900"
            >
              {hero.secondaryCTA.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
```

#### 2b. Features Component

Create `components/landing/Features.tsx`:

```tsx
import { landingContent } from '@/lib/landing-content';
import { ClockIcon, DocumentSearchIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const iconMap = {
  ClockIcon,
  DocumentSearchIcon,
  ChartBarIcon,
};

export function Features() {
  const { features } = landingContent;

  return (
    <section
      id="features"
      className="bg-slate-50 px-4 py-16 dark:bg-slate-900 lg:px-8"
      aria-labelledby="features-heading"
    >
      <h2
        id="features-heading"
        className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-slate-50"
      >
        Why Legal Professionals Choose Our Summariser
      </h2>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features
          .sort((a, b) => a.order - b.order)
          .map((feature) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <div
                key={feature.id}
                className="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-800"
              >
                <Icon className="mb-4 h-12 w-12 text-slate-700 dark:text-slate-300" />
                <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-50">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
      </div>
    </section>
  );
}
```

### Step 3: Create Landing Page Route

Create `app/landing/page.tsx`:

```tsx
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Hero />
      <Features />
    </main>
  );
}
```

### Step 4: Update Root Page (Optional)

**Option A**: Redirect root to landing page:

```tsx
// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/landing');
}
```

**Option B**: Show landing page at root:

```tsx
// app/page.tsx
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Hero />
      <Features />
    </main>
  );
}
```

**Option C**: Keep existing app, add landing as separate route (no changes to app/page.tsx)

### Step 5: Run Development Server

```bash
npm run dev
```

Visit:
- Landing page: `http://localhost:3000/landing`
- Main app: `http://localhost:3000/` (if unchanged)

## Testing

### Component Tests

Create `components/landing/__tests__/Hero.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';

describe('Hero Component', () => {
  it('renders headline', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Summarize Legal Judgments'
    );
  });

  it('renders primary CTA', () => {
    render(<Hero />);
    expect(screen.getByText('Try Free Now')).toBeInTheDocument();
  });
});
```

Run tests:

```bash
npm test
```

### E2E Tests (Playwright)

Create `tests/landing.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('landing page loads and displays hero', async ({ page }) => {
  await page.goto('/landing');

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByText('Try Free Now')).toBeVisible();
});

test('CTA navigates to app', async ({ page }) => {
  await page.goto('/landing');
  await page.getByText('Try Free Now').click();
  await expect(page).toHaveURL(/\/app/);
});
```

Run E2E tests:

```bash
npx playwright test
```

## Performance Testing

### Lighthouse Audit

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3000/landing --view
```

**Target Scores**:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

### Manual Checklist

- [ ] Page loads in <3 seconds on 4G
- [ ] Images are optimized (WebP format)
- [ ] Fonts are preloaded
- [ ] No layout shift on load (CLS <0.1)
- [ ] All interactive elements respond <100ms

## Common Issues & Troubleshooting

### Issue: TypeScript errors for icon imports

**Solution**: Ensure `@heroicons/react` is installed:
```bash
npm install @heroicons/react
```

### Issue: Tailwind classes not applying

**Solution**: Verify `tailwind.config.js` includes landing components:
```js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
};
```

### Issue: Dark mode not working

**Solution**: Check `useColorScheme` hook is properly configured in `app/layout.tsx`.

### Issue: Images not loading

**Solution**: Add images to `public/landing/` directory and use Next.js Image component:
```tsx
import Image from 'next/image';
<Image src="/landing/hero.jpg" alt="..." width={1200} height={800} />
```

## Next Steps

1. ✅ Verify landing page displays correctly
2. ✅ Test responsive design on mobile (DevTools)
3. ✅ Run accessibility audit (Lighthouse)
4. ✅ Add placeholder images to `public/landing/`
5. ✅ Customize content in `lib/landing-content.ts`
6. 📋 Run full test suite (`npm test` + `npx playwright test`)
7. 🚀 Deploy to staging for user testing

## Development Resources

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Heroicons Gallery](https://heroicons.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Playwright Docs](https://playwright.dev/)

## Time Estimates

| Task | Estimated Time |
|------|----------------|
| Setup dependencies | 5 minutes |
| Create content config | 10 minutes |
| Build Hero component | 15 minutes |
| Build Features component | 15 minutes |
| Create landing page route | 5 minutes |
| Write component tests | 20 minutes |
| Write E2E tests | 15 minutes |
| Accessibility audit & fixes | 30 minutes |
| **Total** | **~2 hours** |

---

**Need help?** Refer to the [research.md](./research.md) for detailed technical decisions or [spec.md](./spec.md) for requirements.
