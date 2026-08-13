import Screen from "@/app/components/screen";

export const metadata = {
  title: "Quiz",
  description: "Test recall with quizzes generated from what you've studied.",
};

export default function QuizPage() {
  return (
    <Screen
      eyebrow="Practice"
      title="Quiz"
      description="Generate a quiz from any topic or past session, answer under your own pace, and get graded explanations for every question."
      status="Coming soon"
      planned={[
        "Quiz generation with selectable length and difficulty",
        "Multiple choice, true/false, and short answer formats",
        "Per-question grading with an explanation of the correct answer",
        "Score written back to History and weak areas fed into the study plan",
      ]}
    />
  );
}
