import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeScript } from "@/components/theme-script";
import "./globals.css";

/**
 * Inter is a FALLBACK only. The body font stack in globals.css asks for the
 * Apple system face first (SF Pro on Apple hardware, Segoe UI Variable on
 * Windows via system-ui), so most visitors never download this. It exists so
 * Linux and older Android render something deliberate instead of a serif.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "M. Ilham Aji Saputra | Full-Stack Web Developer & AI Engineer",
  description:
    "Portfolio of M. Ilham Aji Saputra — Full-Stack Web Developer & Natural Language Processing (NLP) Engineer skilled in Next.js, Laravel, Python, Llama-3.3, Groq API, and Google Cloud Platform (GCP).",
  keywords: [
    "M. Ilham Aji Saputra",
    "Full-Stack Developer",
    "NLP Engineer",
    "AI Engineer",
    "Next.js Developer",
    "Laravel Developer",
    "Python Developer",
    "Surakarta Developer",
    "Google Cloud Platform",
    "Bangkit Academy"
  ],
  authors: [{ name: "M. Ilham Aji Saputra", url: "https://ilhamaji.github.io" }],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "M. Ilham Aji Saputra | Full-Stack Web Developer & AI Engineer",
    description:
      "Full-Stack Web Developer & NLP Engineer skilled in Next.js, Laravel, Python, Llama 3.3 AI modules, and GCP cloud infrastructure.",
    url: "https://ilhamaji.github.io",
    siteName: "M. Ilham Aji Saputra Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2F2F7" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // `suppressHydrationWarning` is required and scoped to <html>: ThemeScript
    // writes data-theme before hydration, so the attribute legitimately differs
    // from the server-rendered markup.
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-label">{children}</body>
    </html>
  );
}
