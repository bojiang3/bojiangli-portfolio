export const siteConfig = {
  name: "Bojiang Li",
  nickname: "Carmelo",
  title: "Software Engineer 2 / Platform Engineer 2",
  company: "Amplitude",
  location: "San Francisco, CA",
  email: "bli314159@gmail.com",
  description:
    "I build scalable, high-performance platforms and applications using Python, Java, Node.js, and Swift. Currently a Platform Engineer at Amplitude. CMU grad, avid Geoguessr player, and landscape photographer.",
  socials: {
    github: "https://github.com/bojiang3",
    linkedin: "https://www.linkedin.com/in/bojiang-li/",
  },
};

export interface Experience {
  company: string;
  title: string;
  duration: string;
  logo: string;
  current?: boolean;
}

export const experiences: Experience[] = [
  {
    company: "Amplitude",
    title: "Software Engineer 2 / Platform Engineer 2",
    duration: "Feb 2026 — Present",
    logo: "https://companieslogo.com/img/orig/AMPL_BIG-845de968.png",
    current: true,
  },
  {
    company: "Geotab",
    title: "Software Engineer",
    duration: "Mar 2025 — Feb 2026",
    logo: "https://upload.wikimedia.org/wikipedia/en/4/49/Geotab_Logo.jpg",
  },
  {
    company: "Fidelity Investments",
    title: "Software Engineer",
    duration: "Apr 2023 — Apr 2025",
    logo: "/fidelity_logo.png",
  },
  {
    company: "Apple",
    title: "Software Engineer Intern",
    duration: "2022",
    logo: "/apple_logo.svg",
  },
  {
    company: "VMware",
    title: "Software Engineer Intern",
    duration: "2021",
    logo: "/vmware_logo.jpg",
  },
  {
    company: "UIUC",
    title: "Computer Science Teaching Assistant",
    duration: "2020",
    logo: "https://brand.illinois.edu/wp-content/uploads/2024/02/Color-Variation-Orange-Block-I-White-Background.png",
  },
  {
    company: "EA",
    title: "Red Alert 2 Map Developer",
    duration: "2006 — 2007",
    logo: "https://www.logo.wine/a/logo/Electronic_Arts/Electronic_Arts-Logo.wine.svg",
  },
];

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  linkText: string;
  featured?: boolean;
  hackathon?: boolean;
}

export const projects: Project[] = [
  {
    title: "GMI GPU Cost Optimizer",
    description:
      "Agentic AI system for optimal GPU deployment on GMI Cloud. Uses Kimi K2.5 with autonomous tool calling for multi-step cost analysis, deployment comparisons, and scaling plans.",
    tech: ["Python", "Streamlit", "Kimi K2.5", "Vercel"],
    link: "https://gmi-gpu-optimizer.vercel.app",
    linkText: "Live Demo",
    featured: true,
    hackathon: true,
  },
  {
    title: "FluidStack GPU Dashboard",
    description:
      "Real-time GPU monitoring for Blackwell clusters (B200/B100). Separates LLM prefill from decode phases for per-job power tracking at 50ms refresh latency.",
    tech: ["FastAPI", "Streamlit", "Kubernetes", "Prometheus"],
    link: "https://github.com/bojiang3/fluidstack-gpu-dashboard",
    linkText: "GitHub",
    featured: true,
    hackathon: true,
  },
  {
    title: "CSS Complexity Analyzer",
    description:
      "Web app to identify, visualize, and resolve CSS complexity issues — detects overly complex selectors, unused rules, and duplicate properties.",
    tech: ["React", "JavaScript"],
    link: "https://css-complexity-analyzer.vercel.app/",
    linkText: "Live Demo",
    featured: true,
  },
  {
    title: "Kubernetes Flashcards",
    description: "iOS app to master Kubernetes concepts with interactive flashcards.",
    tech: ["Swift", "iOS"],
    link: "https://apps.apple.com/us/app/kubernetes-flashcards/id6742980844/",
    linkText: "App Store",
    featured: true,
  },
  {
    title: "Wiki Knowledge Map",
    description:
      "Full-stack web app providing an interactive knowledge map using Wikipedia data and Mapbox.",
    tech: ["React", "Mapbox", "Wikipedia API"],
    link: "https://wiki-knowledge-map.vercel.app/",
    linkText: "Live Demo",
  },
  {
    title: "Wiki Map",
    description:
      "iOS app to explore Wikipedia articles around the globe — World Tour, Quick Explore, and Nearby Entries modes.",
    tech: ["Swift", "MapKit", "iOS"],
    link: "https://apps.apple.com/us/app/wiki-map-explore-the-world/id6742522164",
    linkText: "App Store",
  },
  {
    title: "Which Next?",
    description:
      "iOS app that finds nearby spots and randomly picks one for you with a delightful lottery animation.",
    tech: ["Swift", "iOS"],
    link: "https://apps.apple.com/us/app/whichnext/id6742585561",
    linkText: "App Store",
  },
  {
    title: "Car Lease Calculator",
    description: "iOS app for calculating and comparing car lease payments.",
    tech: ["Swift", "iOS"],
    link: "https://apps.apple.com/us/app/car-lease-calculator/id6742698622",
    linkText: "App Store",
  },
  {
    title: "Illini Printer Map",
    description:
      "Android app visualizing printer locations at UIUC, serving 50,000 students and scholars.",
    tech: ["Java", "Android"],
    link: "https://github.com/bojiang3/Illini-Printer-Map",
    linkText: "GitHub",
  },
  {
    title: "Transit iOS",
    description:
      "Transportation app built with Swift, UIKit, and Apple MapKit to help drivers navigate obstacles.",
    tech: ["Swift", "UIKit", "MapKit"],
    link: "https://github.com/bojiang3/TransitiOS",
    linkText: "GitHub",
  },
];

export interface Article {
  slug: string;
  title: string;
  date: string;
  description: string;
  keywords: string[];
}

export const articles: Article[] = [
  {
    slug: "multi-agent-vs-raft",
    title: "Multi-Agent Coordination vs Raft: Old Consensus Meets New AI",
    date: "March 2026",
    description:
      "A deep dive comparing how multi-agent LLM systems coordinate versus how Raft achieves consensus — surprisingly similar, surprisingly different.",
    keywords: ["Multi-Agent", "Raft", "LLM", "Distributed Systems"],
  },
  {
    slug: "vibe-coding",
    title: "Vibe Coding Changed How I Ship Side Projects",
    date: "March 2026",
    description:
      "How AI-assisted 'vibe coding' helped me mass-produce side projects and what I actually learned from the experience.",
    keywords: ["Vibe Coding", "AI", "Side Projects", "Productivity"],
  },
  {
    slug: "raft-consensus",
    title: "Raft Consensus in the World of Distributed Systems",
    date: "May 2021",
    description:
      "An introduction to the Raft consensus algorithm and why it matters for building reliable distributed systems.",
    keywords: ["Distributed Systems", "Raft", "Consensus"],
  },
  {
    slug: "implement-raft",
    title: "How to Implement Raft from Scratch",
    date: "July 2024",
    description:
      "A detailed guide on implementing Raft with leader election, log replication, and safety guarantees.",
    keywords: ["Raft", "Implementation", "Distributed Systems"],
  },
];
