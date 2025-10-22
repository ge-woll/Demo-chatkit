import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "Om Business Kolding",
    prompt: "Fortæl kort om Business Kolding, og hvad I kan hjælpe med.",
    icon: "circle-info",
  },
  {
    label: "Direktør",
    prompt: "Hvem er direktør i Business Kolding?",
    icon: "circle-info",
  },
  {
    label: "Kommende events",
    prompt: "Hvilke kommende arrangementer har I inden for ESG, grøn omstilling eller ligneden?",
    icon: "calendar-days",
  },
  {
    label: "Iværksætteri",
    prompt: "Hvordan kan jeg få hjælp som iværksætter?",
    icon: "lightbulb",
  },
  {
    label: "Kontakt",
    prompt: "Hvordan kontakter jeg jer, og hvad er åbningstiderne?",
    icon: "message",
  },
];

export const PLACEHOLDER_INPUT = "Skriv dit spørgsmål…";

export const GREETING = "Hvordan kan vi hjælpe dig?";

export const getThemeConfig = (theme: ColorScheme): ThemeOption => ({
  color: {
    grayscale: {
      hue: 220,
      tint: 6,
      shade: theme === "dark" ? -1 : -4,
    },
    accent: {
      primary: theme === "dark" ? "#f1f5f9" : "#0f172a",
      level: 1,
    },
  },
  radius: "round",
  // Add other theme options here
  // chatkit.studio/playground to explore config options
});
