"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ title, subtitle, children, className = "" }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mx-auto max-w-5xl px-6 py-20 ${className}`}
    >
      <h2 className="text-2xl font-bold text-zinc-100">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-zinc-500">{subtitle}</p>
      )}
      <div className="mt-10">{children}</div>
    </motion.section>
  );
}
