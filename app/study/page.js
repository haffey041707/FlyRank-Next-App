import Screen from "@/app/components/screen";

export const metadata = {
  title: "Study",
  description: "Work through any topic with an AI tutor that adapts to you.",
};

export default function StudyPage() {
  return (
    <Screen
      eyebrow="Learn"
      title="Study"
      description="Pick a topic or paste your notes, then work through the material with an AI tutor that explains, checks understanding, and adjusts pace."
      status="Coming soon"
      planned={[
        "Topic input with optional source material (notes, PDF, or pasted text)",
        "Streaming explanations broken into digestible steps",
        "Inline comprehension checks between sections",
        "Save a session to History and generate flashcards from it",
      ]}
    />
  );
}
