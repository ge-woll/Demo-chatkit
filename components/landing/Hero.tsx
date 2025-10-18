"use client";

import { landingContent } from '@/lib/landing-content';
import { CTA } from './CTA';

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
          <CTA config={hero.primaryCTA} size="lg" />
          {hero.secondaryCTA && (
            <CTA config={hero.secondaryCTA} size="lg" />
          )}
        </div>
      </div>
    </section>
  );
}
