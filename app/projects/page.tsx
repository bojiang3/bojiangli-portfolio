import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-20 pt-24">
      <h1 className="text-4xl font-bold text-zinc-100">Projects</h1>
      <p className="mt-3 text-zinc-500">
        Hackathon builds, iOS apps, web tools, and more.
      </p>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
