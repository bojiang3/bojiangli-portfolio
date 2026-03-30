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
          <h1 className="text-4xl font-bold text-stone-900">About Me</h1>
          <div className="mt-8 space-y-5 text-stone-600 leading-relaxed">
            <p>
              I&apos;m Bojiang Li — also known as Carmelo or Melo. I&apos;m a
              platform engineer at <strong className="text-stone-800">Amplitude</strong> in
              San Francisco, working on scalable infrastructure that powers
              product analytics for thousands of companies.
            </p>
            <p>
              Before Amplitude, I worked at <strong className="text-stone-800">Geotab</strong> in
              Atlanta building fleet management software,
              at <strong className="text-stone-800">Fidelity Investments</strong> in
              Boston on financial platforms,
              and interned at <strong className="text-stone-800">Apple</strong> and <strong className="text-stone-800">VMware</strong>.
            </p>
            <p>
              I hold a master&apos;s degree from <strong className="text-stone-800">Carnegie Mellon University</strong> where
              I studied distributed systems and conversational AI, and my
              undergrad is from the <strong className="text-stone-800">University of Illinois at
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
              className="rounded-lg border border-stone-200 bg-white/60 px-4 py-2.5 text-sm text-stone-600 transition-all hover:border-violet-300 hover:bg-white hover:text-stone-900 hover:shadow-md hover:shadow-violet-100"
            >
              LinkedIn
            </a>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-stone-200 bg-white/60 px-4 py-2.5 text-sm text-stone-600 transition-all hover:border-violet-300 hover:bg-white hover:text-stone-900 hover:shadow-md hover:shadow-violet-100"
            >
              GitHub
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="rounded-lg border border-stone-200 bg-white/60 px-4 py-2.5 text-sm text-stone-600 transition-all hover:border-violet-300 hover:bg-white hover:text-stone-900 hover:shadow-md hover:shadow-violet-100"
            >
              Email
            </a>
          </div>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-stone-200">
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
