import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/app/components/header";
import Sidebar from "@/app/components/sidebar";
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
  description: "AI-powered study and revision workspace",
};

/**
 * Root layout and application shell. Server Component.
 *
 * Below lg the sidebar is hidden and the header exposes a compact drawer.
 * At lg and above the grid gains a fixed 16rem sidebar column.
 */
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-zinc-900 focus:px-3 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>

        <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
          <Sidebar />

          <div className="flex min-h-screen flex-col">
            <Header />

            <main id="main" className="flex-1">
              {children}
            </main>

            <footer className="border-t border-zinc-200 px-4 py-6 text-sm text-zinc-500 sm:px-6 dark:border-zinc-800 dark:text-zinc-400">
              AI Study Assistant — routed scaffold. Features land screen by
              screen.
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
