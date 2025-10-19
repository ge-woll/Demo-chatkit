import { CTA } from './CTA';
import { CTAConfig } from '@/types/landing';

export function CTASection() {
  const ctaConfig: CTAConfig = {
    label: "Start Summarizing Now",
    href: "/app",
    variant: "primary",
    ariaLabel: "Start using the judgment summariser application now"
  };

  return (
    <section className="bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-20 dark:from-slate-950 dark:to-slate-900 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Ready to Save Time on Legal Research?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
          Join legal professionals who are already saving 80% of their judgment analysis time. Start summarizing now—no credit card required.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <CTA config={ctaConfig} size="lg" />
          <CTA
            config={{
              label: "Learn More",
              href: "#features",
              variant: "secondary",
              ariaLabel: "Scroll back to features section"
            }}
            size="lg"
          />
        </div>
        <p className="mt-8 text-sm text-slate-400">
          Free to try • No credit card required • Setup in 60 seconds
        </p>
      </div>
    </section>
  );
}
