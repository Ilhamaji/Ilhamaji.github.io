import {
  NextjsIcon,
  ReactIcon,
  LaravelIcon,
  NodeIcon,
  PhpIcon,
  TypescriptIcon,
  TailwindIcon,
  MysqlIcon,
  GroqIcon,
  OpenaiIcon,
  GeminiIcon,
  GcpIcon,
  FirebaseIcon,
  SupabaseIcon,
  JwtIcon,
  GitIcon,
  AxiosIcon,
  DiscordIcon,
  FfmpegIcon,
} from "@/components/tech-icons";

/**
 * Brand mark registry for the Skills rail and project cards.
 *
 * `color` is the brand's own color, tuned so it stays legible on the light
 * tile (`#F5F5F0`). Icons are non-text content, so WCAG requires 3:1 against
 * their background. Four brands failed at their published hex and are
 * darkened to the nearest passing value — the hue is preserved, only the
 * lightness moves:
 *
 *   React      #61DAFB 1.49:1  ->  #4294AB 3.17:1
 *   Tailwind   #06B6D4 2.22:1  ->  #0599B2 3.09:1
 *   Firebase   #FFCA28 1.40:1  ->  #AD891B 3.01:1
 *   Supabase   #3ECF8E 1.83:1  ->  #2F9D6C 3.12:1
 *
 * Everything else already passed 3:1 and uses its published color.
 */
export interface SectionIcon {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  color: string;
}

export const SECTION_ICONS: Record<string, SectionIcon> = {
  "Next.js": { Icon: NextjsIcon, label: "Next.js", color: "#000000" },
  React: { Icon: ReactIcon, label: "React", color: "#4294AB" },
  TypeScript: { Icon: TypescriptIcon, label: "TypeScript", color: "#3178C6" },
  Laravel: { Icon: LaravelIcon, label: "Laravel", color: "#FF2D20" },
  "Node.js": { Icon: NodeIcon, label: "Node.js", color: "#339933" },
  PHP: { Icon: PhpIcon, label: "PHP", color: "#777BB4" },
  "Tailwind CSS": { Icon: TailwindIcon, label: "Tailwind CSS", color: "#0599B2" },
  MySQL: { Icon: MysqlIcon, label: "MySQL", color: "#4479A1" },
  Groq: { Icon: GroqIcon, label: "Groq", color: "#F55036" },
  OpenAI: { Icon: OpenaiIcon, label: "OpenAI", color: "#412991" },
  "Gemini API": { Icon: GeminiIcon, label: "Gemini API", color: "#4285F4" },
  GCP: { Icon: GcpIcon, label: "Google Cloud", color: "#4285F4" },
  Firebase: { Icon: FirebaseIcon, label: "Firebase", color: "#AD891B" },
  Supabase: { Icon: SupabaseIcon, label: "Supabase", color: "#2F9D6C" },
  JWT: { Icon: JwtIcon, label: "JWT", color: "#000000" },
  Git: { Icon: GitIcon, label: "Git", color: "#F05032" },
  Axios: { Icon: AxiosIcon, label: "Axios", color: "#5A29E4" },
  "Discord.js": { Icon: DiscordIcon, label: "Discord.js", color: "#5865F2" },
  FFmpeg: { Icon: FfmpegIcon, label: "FFmpeg", color: "#007808" },
};

/** The stack shown in the skills rail, ordered by strength of use. */
export const STACK: string[] = [
  "Next.js",
  "React",
  "TypeScript",
  "Laravel",
  "Node.js",
  "PHP",
  "Tailwind CSS",
  "MySQL",
  "Groq",
  "OpenAI",
  "Gemini API",
  "GCP",
  "Firebase",
  "Supabase",
  "JWT",
  "Git",
];
