import Screen from "@/app/components/screen";

export const metadata = {
  title: "Dashboard",
  description: "Your study activity, streaks, and what to review next.",
};

export default function DashboardPage() {
  return (
    <Screen
      eyebrow="Overview"
      title="Dashboard"
      description="Preview deployment verified"
      status="Coming soon"
      planned={[
        "Summary tiles for sessions completed, quiz accuracy, and cards due",
        "Activity chart across the last 30 days",
        "Continue-where-you-left-off shortcut into the last study session",
        "Next actions pulled from the active study plan",
      ]}
    />
  );
}
