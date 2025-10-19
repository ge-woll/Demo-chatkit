import { FeatureItem } from '@/types/landing';
import { ClockIcon, DocumentMagnifyingGlassIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const iconMap = {
  ClockIcon,
  DocumentMagnifyingGlassIcon,
  ChartBarIcon,
};

interface FeatureCardProps {
  feature: FeatureItem;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = iconMap[feature.icon as keyof typeof iconMap];

  if (!Icon) {
    console.warn(`Icon "${feature.icon}" not found in iconMap`);
    return null;
  }

  return (
    <div className="group rounded-xl bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-slate-800 dark:hover:bg-slate-750">
      <Icon className="mb-6 h-14 w-14 text-slate-700 transition-colors duration-300 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-200" aria-hidden="true" />
      <h3 className="mb-3 text-xl font-bold leading-tight text-slate-900 dark:text-slate-50 sm:text-2xl">
        {feature.title}
      </h3>
      <p className="leading-relaxed text-slate-600 dark:text-slate-400">
        {feature.description}
      </p>
    </div>
  );
}
