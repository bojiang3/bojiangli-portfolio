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
        className="inline-flex items-center gap-1 text-sm text-stone-400 transition-colors hover:text-stone-700"
      >
        <span>←</span> Back to articles
      </Link>

      <h1 className="mt-8 text-3xl font-bold text-stone-900 sm:text-4xl">
        {article.title}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-sm text-stone-500">{article.date}</span>
        <span className="text-stone-300">·</span>
        {article.keywords.map((kw) => (
          <span
            key={kw}
            className="rounded-md bg-stone-100 px-2 py-0.5 text-xs text-stone-500"
          >
            {kw}
          </span>
        ))}
      </div>

      <hr className="mt-8 border-stone-200" />

      <article className="prose-article mt-10">{content}</article>
    </div>
  );
}
