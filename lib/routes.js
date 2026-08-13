/**
 * Single source of truth for the app's screens.
 * Navigation, the home page route list, and future breadcrumbs all read from here,
 * so adding a screen means adding one entry plus its page.js.
 */
export const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    description: "Your study activity at a glance.",
  },
  {
    href: "/study",
    label: "Study",
    description: "Work through a topic with an AI tutor.",
  },
  {
    href: "/quiz",
    label: "Quiz",
    description: "Test recall with generated questions.",
  },
  {
    href: "/flashcards",
    label: "Flashcards",
    description: "Review decks with spaced repetition.",
  },
  {
    href: "/study-plan",
    label: "Study Plan",
    description: "A schedule built around your goals.",
  },
  {
    href: "/history",
    label: "History",
    description: "Everything you've studied so far.",
  },
  {
    href: "/settings",
    label: "Settings",
    description: "Preferences, model, and account.",
  },
  {
    href: "/health",
    label: "Health",
    description: "Runtime and configuration status.",
  },
];
