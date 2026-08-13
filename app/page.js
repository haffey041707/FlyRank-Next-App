const stack = [
  { label: "Framework", value: "Next.js 16 · App Router" },
  { label: "Language", value: "JavaScript" },
  { label: "Styling", value: "Tailwind CSS v4" },
  { label: "Linting", value: "ESLint" },
];

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-16 dark:bg-black">
      <main className="w-full max-w-xl">
        <p className="text-sm font-medium tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
          FlyRank
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Scaffold is live.
        </h1>
        <p className="mt-3 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          The application shell is deployed and building cleanly. Features land
          from here.
        </p>

        <dl className="mt-10 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {stack.map(({ label, value }) => (
            <div key={label} className="flex justify-between gap-4 py-3">
              <dt className="text-sm text-zinc-500 dark:text-zinc-400">
                {label}
              </dt>
              <dd className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-sm text-zinc-500 dark:text-zinc-400">
          Edit{" "}
          <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono dark:bg-white/[.08]">
            app/page.js
          </code>{" "}
          to get started.
        </p>
      </main>
    </div>
  );
}
