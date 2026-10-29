/**
 * Project data, carried over verbatim from the previous `project-minimal`
 * component. Copy is unchanged: no client, metric, or claim was invented.
 */

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  github: string | null;
  demo: string | null;
  tag: string;
  /** Solid accent block behind the card header. */
  accent: "lime" | "orange" | "purple" | "sky";
}

export const PROJECTS: Project[] = [
  {
    title: "AI Text Summarizer & PDF Engine",
    subtitle: "PT Tiga Serangkai Inti Corpora",
    description:
      "Automated AI-driven text summarization module and learning material search system using Llama-3.3-70B-Versatile via Groq API.",
    tech: ["Groq", "PDF", "Node.js", "Axios"],
    github: null,
    demo: null,
    tag: "Industry AI System",
    accent: "lime",
  },
  {
    title: "Scholarship Student Monitoring System",
    subtitle: "Universitas Tiga Serangkai",
    description:
      "Comprehensive administrative web platform built with Laravel to streamline scholarship recipient data tracking, evaluation, and reporting.",
    tech: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Excel"],
    github: "https://github.com/Ilhamaji/academy-dashboard",
    demo: null,
    tag: "Institutional Platform",
    accent: "orange",
  },
  {
    title: "Sleepwell AI Health API",
    subtitle: "Bangkit Academy Capstone",
    description:
      "Cloud-native back-end service for sleep quality prediction utilizing AI-driven questionnaire analysis deployed on Google Cloud Platform.",
    tech: ["GCP", "Node.js", "Hapi.js", "JWT"],
    github: "https://github.com/capstone-sleepwell/sleepwell-api",
    demo: "https://github.com/capstone-sleepwell/capstone-sleepwell/releases",
    tag: "GCP Cloud API",
    accent: "purple",
  },
  {
    title: "AI Chat Bot Multimodal Discord",
    subtitle: "Open-Source AI Tool",
    description:
      "Multimodal intelligent bot with continuous context awareness, document analysis, and multi-LLM model routing.",
    tech: ["Node.js", "Discord.js", "Groq", "OpenAI", "Gemini API", "FFmpeg"],
    github: "https://github.com/Ilhamaji/ai-bot",
    demo: "https://discord.com/oauth2/authorize?client_id=1308770920562823228",
    tag: "Open Source AI",
    accent: "sky",
  },
];
