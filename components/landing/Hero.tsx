"use client";

import { landingContent } from '@/lib/landing-content';
import { CTA } from './CTA';

export function Hero() {
  const { hero } = landingContent;

  return (
    <section
      className="flex min-h-[600px] flex-col items-center justify-center px-4 py-20 lg:min-h-[700px] lg:px-8 lg:py-24 animate-fade-in"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-3xl text-center lg:text-left">
        <h1
          id="hero-heading"
          className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight"
        >
          {hero.headline}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl sm:leading-relaxed">
          {hero.subheadline}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
          <CTA config={hero.primaryCTA} size="lg" />
          {hero.secondaryCTA && (
            <CTA config={hero.secondaryCTA} size="lg" />
          )}
        </div>
      </div>
    </section>
  );
}
