'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'

export default function MagicPage() {
  const tabs = useMemo(() => ['Experiences', 'Outcomes', 'Proof'] as const, [])
  type Tab = (typeof tabs)[number]
  const [activeTab, setActiveTab] = useState<Tab>('Experiences')

  const tabContent = useMemo<
    Record<Tab, { title: string; body: string; meta: string }[]>
  >(
    () => ({
      Experiences: [
        {
          title: 'Keynote Opener',
          body: 'A 12-minute opening act designed to energize conferences before product sessions.',
          meta: 'In-person',
        },
        {
          title: 'Executive Dinner Set',
          body: 'Table-side close-up performances that create natural conversation starters across teams.',
          meta: 'Small groups',
        },
        {
          title: 'Virtual Interactive',
          body: 'Remote-first illusions with audience participation, optimized for distributed teams.',
          meta: 'Hybrid-ready',
        },
      ],
      Outcomes: [
        {
          title: 'Higher Event Recall',
          body: 'Moments are crafted around your message so attendees remember the product story, not just the trick.',
          meta: '+47% recall lift',
        },
        {
          title: 'Team Connection',
          body: 'Short interaction loops encourage participation and reduce passive audience behavior.',
          meta: 'Built for engagement',
        },
        {
          title: 'Premium Brand Signal',
          body: 'The show format aligns with modern product launches: crisp, intentional, and technically polished.',
          meta: 'Enterprise tone',
        },
      ],
      Proof: [
        {
          title: 'Linear Ops Offsite',
          body: '“The pacing and precision were perfect for our team retreat.”',
          meta: 'Head of Operations',
        },
        {
          title: 'Venture Demo Night',
          body: '“It felt like product storytelling, not filler entertainment.”',
          meta: 'Program Director',
        },
        {
          title: 'SaaS Summit',
          body: '“Best opening segment we have run in three years.”',
          meta: 'Event Lead',
        },
      ],
    }),
    []
  )

  return (
    <div className='relative min-h-screen overflow-hidden bg-slate-950 text-slate-100'>
      <div className='pointer-events-none absolute -top-44 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-sky-500/25 blur-3xl' />
      <div className='pointer-events-none absolute bottom-0 right-[-12rem] h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl' />

      <section className='mx-auto max-w-6xl px-6 pb-10 pt-20 md:pt-24'>
        <p className='inline-flex rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-slate-300'>
          MAGIC EXPERIENCE
        </p>
        <h1 className='mt-6 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl'>
          Stagecraft built for modern product teams.
        </h1>
        <p className='mt-5 max-w-2xl text-base text-slate-300 sm:text-lg'>
          A premium performance format for launches, offsites, and leadership
          events. Clean execution, deliberate pacing, and memorable moments.
        </p>
        <div className='mt-8 flex flex-wrap gap-3'>
          <Link
            href='#book'
            className='rounded-xl bg-gradient-to-r from-sky-300 to-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_-24px_rgba(52,211,153,0.8)] transition hover:from-sky-200 hover:to-emerald-200'
          >
            Book a Show
          </Link>
          <a
            href='mailto:bookings@mysto.show'
            className='rounded-xl border border-sky-400/45 bg-sky-500/10 px-5 py-3 text-sm font-semibold text-sky-100 transition hover:border-sky-300/65 hover:bg-sky-500/20'
          >
            Get Pricing
          </a>
        </div>
      </section>

      <section className='mx-auto max-w-6xl px-6 pb-20'>
        <div className='rounded-3xl border border-slate-800 bg-slate-900/65 p-4 shadow-[0_40px_100px_-60px_rgba(56,189,248,0.45)] backdrop-blur'>
          <div className='flex flex-wrap gap-2 rounded-2xl border border-slate-800 bg-slate-950/60 p-2'>
            {tabs.map((tab) => (
              <button
                key={tab}
                type='button'
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-sky-300 to-emerald-300 text-slate-950 shadow-[0_14px_30px_-20px_rgba(56,189,248,0.8)]'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-sky-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className='mt-4 grid gap-3 md:grid-cols-3'>
            {tabContent[activeTab].map((item) => (
              <article
                key={item.title}
                className='group rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-6 transition duration-300 hover:-translate-y-0.5 hover:border-slate-600'
              >
                <p className='text-xs font-semibold uppercase tracking-[0.12em] text-sky-300/90'>
                  {item.meta}
                </p>
                <h2 className='mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white'>
                  {item.title}
                </h2>
                <p className='mt-3 text-sm leading-7 text-slate-300'>
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id='book' className='mx-auto max-w-6xl px-6 pb-24'>
        <div className='rounded-3xl border border-slate-800 bg-slate-900/70 p-8 md:p-10'>
          <div className='flex flex-col gap-8 md:flex-row md:items-end md:justify-between'>
            <div className='max-w-2xl'>
              <p className='text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300'>
                Booking
              </p>
              <h2 className='mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl'>
                Let&apos;s design a show around your next event.
              </h2>
              <p className='mt-4 text-slate-300'>
                Share your audience size, event type, and date. You&apos;ll get
                a custom run-of-show and pricing within one business day.
              </p>
            </div>
            <a
              href='mailto:bookings@mysto.show?subject=Event%20Booking'
              className='inline-flex rounded-xl bg-gradient-to-r from-emerald-300 to-sky-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_-24px_rgba(56,189,248,0.75)] transition hover:from-emerald-200 hover:to-sky-200'
            >
              Start Booking
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
