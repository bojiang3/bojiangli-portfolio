import { siteConfig } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-zinc-600">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
        <div className="flex gap-6">
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
          >
            GitHub
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
