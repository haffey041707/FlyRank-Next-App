import { Geist, Geist_Mono } from "next/font/google";
import SiteNav from "@/app/components/site-nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "AI Study Assistant",
    template: "%s · AI Study Assistant",
  },
  description:
    "Study smarter with AI-guided sessions, quizzes, flashcards, and a plan built around your goals.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-zinc-900 focus:px-3 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>

        <SiteNav />

        <main id="main" className="flex-1">
          {children}
        </main>

        <footer className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-zinc-500 dark:text-zinc-400">
            AI Study Assistant — routed scaffold. Features land screen by screen.
          </div>
        </footer>
      </body>
    </html>
  );
}
