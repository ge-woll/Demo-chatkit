import { LandingContent } from '@/types/landing';

export const landingContent: LandingContent = {
  hero: {
    headline: "Summarize Legal Judgments in Seconds, Not Hours",
    subheadline: "AI-powered judgment analysis for legal professionals. Get instant summaries of court decisions, key findings, and precedents.",
    primaryCTA: {
      label: "Try Free Now",
      href: "/app",
      variant: "primary",
      ariaLabel: "Start using the judgment summariser application"
    },
    secondaryCTA: {
      label: "See How It Works",
      href: "#features",
      variant: "secondary",
      ariaLabel: "Scroll to features section to learn more"
    }
  },
  features: [
    {
      id: "instant-summaries",
      title: "Instant Summaries",
      description: "Upload a judgment and receive a comprehensive summary in seconds. No more hours of manual reading and analysis.",
      icon: "ClockIcon",
      order: 1
    },
    {
      id: "key-points",
      title: "Key Points Extraction",
      description: "Automatically identifies holdings, legal reasoning, and precedents. Focus on what matters most to your case.",
      icon: "DocumentSearchIcon",
      order: 2
    },
    {
      id: "time-savings",
      title: "Save 80% of Research Time",
      description: "Reduce case research time dramatically. Get back to practicing law instead of reading endless documents.",
      icon: "ChartBarIcon",
      order: 3
    }
  ]
};
