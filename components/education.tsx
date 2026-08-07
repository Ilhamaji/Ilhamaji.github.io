"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from "lucide-react";

const educationList = [
  {
    degree: "Bachelor of Computer Science (S.Kom)",
    institution: "Universitas Tiga Serangkai",
    period: "Sep 2022 – Jul 2026",
    location: "Surakarta, Indonesia",
    details: "Focusing on Software Engineering, Artificial Intelligence, Web Development, and Cloud Computing.",
    type: "Formal Education"
  },
  {
    degree: "Vocational High School Diploma in Software Engineering (RPL)",
    institution: "SMK Negeri 2 Surakarta",
    period: "Mar 2018 – Jul 2021",
    location: "Surakarta, Indonesia",
    details: "Foundational education in algorithms, database design, object-oriented programming, and web development fundamentals.",
    type: "Vocational Education"
  }
];

const certifications = [
  {
    title: "Bangkit Academy Cloud Computing Cohort Graduate",
    issuer: "Led by Google, Tokopedia, Gojek, & Traveloka",
    period: "Sep 2024 – Dec 2024",
    description: "Rigorous industry program covering GCP Cloud Architecture, DevSecOps pipelines, logging, monitoring, and cloud security."
  }
];

export function EducationSection() {
  return (
    <section id="education" className="py-24 px-6 border-t border-border/50 relative">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16"
        >
          <span className="text-accent font-mono text-xs uppercase tracking-[0.4em] mb-4 block">
            Academic Background
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Education & Certifications.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formal Education */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-tight flex items-center gap-2 text-foreground mb-6">
              <GraduationCap className="w-5 h-5 text-accent" />
              Education History
            </h3>
            {educationList.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 glass-minimal rounded-3xl border border-border/50 hover:bg-muted/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
                      {edu.type}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-accent" />
                      {edu.period}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-foreground tracking-tight mb-1">
                    {edu.degree}
                  </h4>
                  <p className="text-sm font-semibold text-accent/90 mb-3 flex items-center gap-1.5">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications & Programs */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-tight flex items-center gap-2 text-foreground mb-6">
              <Award className="w-5 h-5 text-accent" />
              Certifications & Specialized Training
            </h3>
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 glass-minimal rounded-3xl border border-border/50 hover:bg-muted/40 transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
                    Certified Program
                  </span>
                  <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-accent" />
                    {cert.period}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-foreground tracking-tight mb-1">
                  {cert.title}
                </h4>
                <p className="text-sm font-semibold text-accent/90 mb-3">
                  {cert.issuer}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
