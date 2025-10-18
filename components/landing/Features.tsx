import { landingContent } from '@/lib/landing-content';
import { FeatureCard } from './FeatureCard';

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
          .map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
      </div>
    </section>
  );
}
