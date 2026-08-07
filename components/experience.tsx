"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Sparkles, CheckCircle2 } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location?: string;
  type: string;
  description: string[];
  skills: string[];
  highlight?: string;
}

const experiences: ExperienceItem[] = [
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
      "Enhanced the efficiency of processing educational reference documents and reference clipping preparation for editorial staff."
    ],
    skills: ["Python", "Groq API", "Llama-3.3", "NLP", "PyMuPDF", "Prompt Engineering", "RESTful APIs"]
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
      "Maintained accurate, real-time data flow across the platform, enhancing administrative monitoring efficiency."
    ],
    skills: ["Laravel", "PHP", "MySQL", "RESTful APIs", "Database Design", "Tailwind CSS"]
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
      "Applied structured problem-solving and technical risk management to optimize cloud infrastructure performance."
    ],
    skills: ["Google Cloud Platform (GCP)", "Docker", "Kubernetes", "DevSecOps", "Node.js", "Hapi.js"]
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
      "Integrated Firebase backend services for authentication, article activity storage, and student data management, improving registration processing efficiency."
    ],
    skills: ["ReactJS", "Tailwind CSS", "Firebase", "Authentication", "Supabase"]
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6 border-t border-border/50 relative">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <span className="text-accent font-mono text-xs uppercase tracking-[0.4em] mb-4 block">
              Career Trajectory
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Work Experience.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm font-medium">
            Proven track record in AI module integration, backend architecture, and cloud deployment.
          </p>
        </motion.div>

        <div className="relative border-l border-border/60 ml-4 md:ml-8 space-y-12 pl-6 md:pl-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-accent group-hover:bg-accent group-hover:scale-125 transition-all duration-300 shadow-sm" />

              <div className="p-6 md:p-8 glass-minimal rounded-3xl border border-border/50 transition-all hover:bg-muted/40 relative overflow-hidden">
                {exp.highlight && (
                  <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    {exp.highlight}
                  </div>
                )}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">
                      {exp.role}
                    </h3>
                    <p className="text-base font-semibold text-accent/90 flex items-center gap-2 mt-0.5">
                      <Briefcase className="w-4 h-4 shrink-0 text-muted-foreground" />
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground shrink-0">
                    <span className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full border border-border/40">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      {exp.period}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1.5 bg-muted/30 px-3 py-1.5 rounded-full border border-border/30">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-accent/70 shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/30">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-medium font-mono bg-accent/5 hover:bg-accent/10 text-foreground/80 px-3 py-1 rounded-full border border-border/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
