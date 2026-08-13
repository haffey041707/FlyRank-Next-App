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
      <p className="mt-10 rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
        API credentials are never entered or stored in the browser. They stay in
        server-side environment variables — see{" "}
        <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-xs dark:bg-white/[.08]">
          .env.example
        </code>
        .
      </p>
    </Screen>
  );
}
