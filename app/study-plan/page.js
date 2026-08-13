import Screen from "@/app/components/screen";

export const metadata = {
  title: "Study Plan",
  description: "A schedule built around your goals, deadlines, and weak spots.",
};

export default function StudyPlanPage() {
  return (
    <Screen
      eyebrow="Plan"
      title="Study Plan"
      description="Tell the assistant what you're preparing for and how much time you have. It builds a day-by-day plan and adjusts as your quiz results come in."
      status="Coming soon"
      planned={[
        "Goal setup: subject, target date, and weekly time budget",
        "Generated day-by-day schedule with topic breakdowns",
        "Progress tracking against the plan, with catch-up suggestions",
        "Automatic rebalancing toward topics with weak quiz scores",
      ]}
    />
  );
}
