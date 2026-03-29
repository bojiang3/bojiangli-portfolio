import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-20 pt-24">
      <div className="grid gap-12 md:grid-cols-[1fr,300px]">
        <div>
          <h1 className="text-4xl font-bold text-zinc-100">About Me</h1>
          <div className="mt-8 space-y-5 text-zinc-400 leading-relaxed">
            <p>
              I&apos;m Bojiang Li — also known as Carmelo or Melo. I&apos;m a
              platform engineer at <strong className="text-zinc-200">Amplitude</strong> in
              San Francisco, working on scalable infrastructure that powers
              product analytics for thousands of companies.
            </p>
            <p>
              Before Amplitude, I worked at <strong className="text-zinc-200">Geotab</strong> in
              Atlanta building fleet management software,
              at <strong className="text-zinc-200">Fidelity Investments</strong> in
              Boston on financial platforms,
              and interned at <strong className="text-zinc-200">Apple</strong> and <strong className="text-zinc-200">VMware</strong>.
            </p>
            <p>
              I hold a master&apos;s degree from <strong className="text-zinc-200">Carnegie Mellon University</strong> where
              I studied distributed systems and conversational AI, and my
              undergrad is from the <strong className="text-zinc-200">University of Illinois at
              Urbana-Champaign</strong>.
            </p>
            <p>
              I build across the full stack — from iOS apps on the App Store to
              hackathon-winning AI agents to cloud infrastructure with
              Kubernetes and Terraform. My tech stack includes Python, Java,
              Node.js, Swift, and Go.
            </p>
            <p>
              Outside of engineering, I&apos;m an avid Geoguessr player,
              geography enthusiast, and photographer who loves capturing
              landscapes and portraits.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100"
            >
              LinkedIn
            </a>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100"
            >
              GitHub
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100"
            >
              Email
            </a>
          </div>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-zinc-800">
          <Image
            src="/homepage.jpg"
            alt="Bojiang Li"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
