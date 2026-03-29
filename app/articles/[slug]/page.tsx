import { notFound } from "next/navigation";
import { articles } from "@/lib/data";
import { articleContent } from "@/lib/articles";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Not Found" };
  return {
    title: article.title,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const content = articleContent[slug];
  if (!content) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 pb-20 pt-24">
      <Link
        href="/articles"
        className="inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
      >
        <span>←</span> Back to articles
      </Link>

      <h1 className="mt-8 text-3xl font-bold text-zinc-100 sm:text-4xl">
        {article.title}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-sm text-zinc-500">{article.date}</span>
        <span className="text-zinc-700">·</span>
        {article.keywords.map((kw) => (
          <span
            key={kw}
            className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-xs text-zinc-400"
          >
            {kw}
          </span>
        ))}
      </div>

      <hr className="mt-8 border-zinc-800" />

      <article className="prose-article mt-10">{content}</article>
    </div>
  );
}
