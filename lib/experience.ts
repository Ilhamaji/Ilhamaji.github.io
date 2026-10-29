/**
 * Experience data, carried over verbatim from the previous `experience`
 * component. Roles, companies, dates, and descriptions are unchanged.
 */

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location?: string;
  type: string;
  description: string[];
  skills: string[];
  highlight?: string;
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Artificial Intelligence Engineer",
    company: "PT Tiga Serangkai Inti Corpora",
    period: "Jan 2026 – Jun 2026",
    location: "Surakarta, Indonesia",
    type: "Industry Experience",
    highlight: "Llama-3.3-70B & Groq API Integration",
    description: [
      "Designed and developed an automated AI-driven text summarization module for the AI-Based Learning Material Search System using the Llama-3.3-70B-Versatile model via Groq API.",
      "Engineered an end-to-end PDF processing pipeline featuring document validation, PyMuPDF text extraction, Regex preprocessing, prompt engineering, and structured output parsing.",
      "Implemented metadata validation using SequenceMatcher and evaluated performance across manual validation, parsing success rate, and latency testing.",
      "Enhanced the efficiency of processing educational reference documents and reference clipping preparation for editorial staff.",
    ],
    skills: [
      "Python",
      "Groq API",
      "Llama-3.3",
      "NLP",
      "PyMuPDF",
      "Prompt Engineering",
      "RESTful APIs",
    ],
  },
  {
    role: "Backend Web Developer",
    company: "Universitas Tiga Serangkai",
    period: "Mar 2025 – Sep 2025",
    location: "Surakarta, Indonesia",
    type: "Institutional Project",
    highlight: "Scholarship System Architecture",
    description: [
      "Developed a comprehensive Scholarship Student Monitoring Web System using Laravel to streamline student data tracking and reporting.",
      "Engineered robust server-side logic, designed optimized database schemas, and implemented secure APIs for seamless frontend-backend integration.",
      "Maintained accurate, real-time data flow across the platform, enhancing administrative monitoring efficiency.",
    ],
    skills: [
      "Laravel",
      "PHP",
      "MySQL",
      "RESTful APIs",
      "Database Design",
      "Tailwind CSS",
    ],
  },
  {
    role: "Cloud Computing Cohort",
    company: "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
    period: "Sep 2024 – Dec 2024",
    location: "Indonesia",
    type: "Career Readiness Program",
    highlight: "Google Cloud Platform & DevSecOps",
    description: [
      "Participated in an intensive cloud computing program focused on DevSecOps, logging, monitoring, and deploying scalable solutions on Google Cloud Platform (GCP).",
      "Collaborated in a cross-functional capstone team to architect and execute GCP-based cloud deployment pipelines.",
      "Applied structured problem-solving and technical risk management to optimize cloud infrastructure performance.",
    ],
    skills: [
      "Google Cloud Platform (GCP)",
      "Docker",
      "Kubernetes",
      "DevSecOps",
      "Node.js",
      "Hapi.js",
    ],
  },
  {
    role: "Full-Stack Web Developer",
    company: "PAUD Desa Banaran",
    period: "Sep 2023 – Dec 2023",
    location: "Surakarta, Indonesia",
    type: "Community Project",
    highlight: "Web Portal & Firebase Integration",
    description: [
      "Built a responsive landing page and student registration web portal using ReactJS and Tailwind CSS.",
      "Integrated Firebase backend services for authentication, article activity storage, and student data management, improving registration processing efficiency.",
    ],
    skills: ["ReactJS", "Tailwind CSS", "Firebase", "Authentication", "Supabase"],
  },
];
