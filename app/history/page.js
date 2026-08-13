import Screen from "@/app/components/screen";

export const metadata = {
  title: "History",
  description: "Every session, quiz, and review you've completed.",
};

export default function HistoryPage() {
  return (
    <Screen
      eyebrow="Archive"
      title="History"
      description="A searchable record of everything you've studied — past sessions, quiz scores, and flashcard reviews, all revisitable."
      status="Coming soon"
      planned={[
        "Chronological list of sessions, quizzes, and reviews",
        "Filter by topic, activity type, and date range",
        "Open any past session to re-read the explanation transcript",
        "Export a topic's history as notes",
      ]}
    />
  );
}
