import { landingContent } from '@/lib/landing-content';
import { FeatureCard } from './FeatureCard';

export function Features() {
  const { features } = landingContent;

  return (
    <section
      id="features"
      className="bg-slate-50 px-4 py-20 dark:bg-slate-900 lg:px-8 lg:py-24"
      aria-labelledby="features-heading"
    >
      <h2
        id="features-heading"
        className="mb-16 text-center text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl"
      >
        Why Legal Professionals Choose Our Summariser
      </h2>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-12">
        {features
          .sort((a, b) => a.order - b.order)
          .map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
      </div>
    </section>
  );
}
