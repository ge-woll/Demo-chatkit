import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';

export default function LandingPage() {
  return (
    <>
      {/* Skip to main content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
      >
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen bg-white dark:bg-slate-950">
        <Hero />
        <Features />
      </main>
    </>
  );
}
