import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RootProvider } from "@/components/root-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "M. Ilham Aji Saputra | Full-Stack Web Developer & AI Specialist",
  description:
    "Portfolio of M. Ilham Aji Saputra — Full-Stack Web Developer & Natural Language Processing (NLP) Specialist skilled in Next.js, Laravel, Python, Llama-3.3, Groq API, and Google Cloud Platform (GCP).",
  keywords: [
    "M. Ilham Aji Saputra",
    "Full-Stack Developer",
    "NLP Specialist",
    "AI Engineer",
    "Next.js Developer",
    "Laravel Developer",
    "Python Developer",
    "Surakarta Developer",
    "Google Cloud Platform",
    "Bangkit Academy"
  ],
  authors: [{ name: "M. Ilham Aji Saputra", url: "https://ilhamaji.github.io" }],
  openGraph: {
    title: "M. Ilham Aji Saputra | Full-Stack Web Developer & AI Specialist",
    description:
      "Full-Stack Web Developer & NLP Specialist skilled in Next.js, Laravel, Python, Llama 3.3 AI modules, and GCP cloud infrastructure.",
    url: "https://ilhamaji.github.io",
    siteName: "M. Ilham Aji Saputra Portfolio",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-minimal font-sans no-scrollbar">
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
