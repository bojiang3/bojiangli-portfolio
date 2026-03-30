"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { experiences } from "@/lib/data";

export function Experience() {
  return (
    <div className="relative space-y-1">
      {/* Timeline line */}
      <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-violet-400/40 via-sky-400/20 to-transparent" />

      {experiences.map((exp, i) => (
        <motion.div
          key={exp.company}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="group relative flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-stone-100/70"
        >
          <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-stone-200 bg-white">
            <Image
              src={exp.logo}
              alt={exp.company}
              width={28}
              height={28}
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-stone-800 group-hover:text-stone-900 transition-colors">
                {exp.company}
              </h3>
              {exp.current && (
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 ring-1 ring-emerald-500/25">
                  Current
                </span>
              )}
            </div>
            <p className="text-sm text-stone-500">{exp.title}</p>
          </div>
          <span className="hidden text-sm text-stone-400 sm:block">{exp.duration}</span>
        </motion.div>
      ))}
    </div>
  );
}
