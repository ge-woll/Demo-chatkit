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
