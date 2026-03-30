import { siteConfig } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-stone-200/60 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-stone-400">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
        <div className="flex gap-6">
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-stone-400 transition-colors hover:text-stone-700"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-stone-400 transition-colors hover:text-stone-700"
          >
            GitHub
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-sm text-stone-400 transition-colors hover:text-stone-700"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
