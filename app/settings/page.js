import Card from "@/app/components/card";
import Screen from "@/app/components/screen";

export const metadata = {
  title: "Settings",
  description: "Preferences, model selection, and account configuration.",
};

export default function SettingsPage() {
  return (
    <Screen
      eyebrow="Configuration"
      title="Settings"
      description="Control how the assistant behaves — model choice, explanation depth, review cadence, and appearance."
      status="Coming soon"
      planned={[
        "Model selection and response-length preference",
        "Default quiz length, difficulty, and flashcard review cadence",
        "Theme preference (system, light, dark)",
        "Data controls: export or clear your study history",
      ]}
    >
      <Card className="mt-section p-gutter text-sm text-muted">
        API credentials are never entered or stored in the browser. They stay in
        server-side environment variables — see{" "}
        <code className="rounded-control bg-surface-hover px-1.5 py-0.5 font-mono text-xs text-primary-accent">
          .env.example
        </code>
        .
      </Card>
    </Screen>
  );
}
