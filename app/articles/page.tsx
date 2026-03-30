import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Articles",
};

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-20 pt-24">
      <h1 className="text-4xl font-bold text-stone-900">Articles</h1>
      <p className="mt-3 text-stone-500">
        Thoughts on distributed systems, consensus, and engineering.
      </p>
      <div className="mt-12 space-y-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="card-hover group block p-6"
          >
            <div className="relative z-10">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <h3 className="text-lg font-semibold text-stone-800 transition-colors group-hover:text-violet-600">
                  {article.title}
                </h3>
                <span className="flex-shrink-0 text-sm text-stone-400">
                  {article.date}
                </span>
              </div>
              <p className="mt-2 text-sm text-stone-500">
                {article.description}
              </p>
              <div className="mt-4 flex gap-2">
                {article.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="rounded-md bg-stone-100 px-2 py-0.5 text-xs text-stone-500"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
