import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { Experience } from "@/components/experience";
import { ProjectCard } from "@/components/project-card";
import { projects, articles } from "@/lib/data";
import Link from "next/link";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <Hero />

      <Section title="Experience">
        <Experience />
      </Section>

      <Section
        title="Featured Projects"
        subtitle="Hackathon builds, iOS apps, and web tools."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
        <Link
          href="/projects"
          className="mt-8 inline-flex items-center gap-1 text-sm text-stone-400 transition-colors hover:text-stone-700"
        >
          View all projects
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </Section>

      <Section
        title="Articles"
        subtitle="Thoughts on distributed systems and engineering."
      >
        <div className="space-y-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="card-hover group block p-5"
            >
              <div className="relative z-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-medium text-stone-800 transition-colors group-hover:text-violet-600">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-sm text-stone-500">
                    {article.description}
                  </p>
                </div>
                <span className="flex-shrink-0 text-sm text-stone-400">
                  {article.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
