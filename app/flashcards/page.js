import Screen from "@/app/components/screen";

export const metadata = {
  title: "Flashcards",
  description: "Review decks with spaced repetition that targets weak cards.",
};

export default function FlashcardsPage() {
  return (
    <Screen
      eyebrow="Review"
      title="Flashcards"
      description="Decks generated from your study sessions, scheduled by spaced repetition so the cards you keep missing come back sooner."
      status="Coming soon"
      planned={[
        "Deck list with due counts and last-reviewed timestamps",
        "Card review flow with flip, rate, and skip",
        "Spaced-repetition scheduling based on recall confidence",
        "Generate a deck automatically from a completed study session",
      ]}
    />
  );
}
