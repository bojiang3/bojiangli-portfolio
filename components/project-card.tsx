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
          <h3 className="font-semibold text-zinc-100 transition-colors group-hover:text-blue-400">
            {project.title}
          </h3>
          {project.hackathon && (
            <span className="rounded-full bg-violet-500/10 px-2.5 py-0.5 text-[11px] font-medium text-violet-400 ring-1 ring-violet-500/20">
              Hackathon 2026
            </span>
          )}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500 line-clamp-3">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-xs text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm font-medium text-blue-400 transition-colors group-hover:text-blue-300">
          {project.linkText}
          <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
        </p>
      </div>
    </motion.a>
  );
}
