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
    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-800">
      <Icon className="mb-4 h-12 w-12 text-slate-700 dark:text-slate-300" aria-hidden="true" />
      <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-50">
        {feature.title}
      </h3>
      <p className="text-slate-600 dark:text-slate-300">
        {feature.description}
      </p>
    </div>
  );
}
