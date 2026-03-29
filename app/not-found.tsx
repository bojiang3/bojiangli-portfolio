import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6">
      <h1 className="gradient-text text-6xl font-bold">404</h1>
      <p className="mt-4 text-zinc-500">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100"
      >
        Go home
      </Link>
    </div>
  );
}
