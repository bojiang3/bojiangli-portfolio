"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card-hover group block p-6"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-stone-900 transition-colors group-hover:text-violet-600">
            {project.title}
          </h3>
          {project.hackathon && (
            <span className="rounded-full bg-violet-500/10 px-2.5 py-0.5 text-[11px] font-medium text-violet-600 ring-1 ring-violet-500/25">
              Hackathon 2026
            </span>
          )}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-stone-500 line-clamp-3">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md bg-stone-100 px-2 py-0.5 text-xs text-stone-500"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm font-medium text-violet-600 transition-colors group-hover:text-violet-500">
          {project.linkText}
          <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
        </p>
      </div>
    </motion.a>
  );
}
