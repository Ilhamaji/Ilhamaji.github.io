import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  themeColor: "#0D0D0D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rubik.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ink text-cream font-body">
        {children}
      </body>
    </html>
  );
}
