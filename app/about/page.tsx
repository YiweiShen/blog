import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About page',
};

export default function AboutPage() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white/85 p-8 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.65)] backdrop-blur sm:p-10">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">About</p>
      <h2 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-slate-950">
        Building useful software with taste and intent.
      </h2>
      <p className="mt-6 max-w-2xl text-lg text-slate-600">
        Welcome to blog. This space shares notes on engineering craft, developer tools, and the systems behind resilient product teams.
      </p>
    </section>
  );
}
