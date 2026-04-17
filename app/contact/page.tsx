import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact page',
}

export default function ContactPage() {
  return (
    <section className='rounded-3xl border border-slate-200 bg-white/85 p-8 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.65)] backdrop-blur sm:p-10'>
      <p className='mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700'>
        Contact
      </p>
      <h2 className='font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-slate-950'>
        Let&apos;s connect.
      </h2>
      <p className='mt-6 max-w-2xl text-lg text-slate-600'>
        Reach out anytime at{' '}
        <a
          href='mailto:example@example.com'
          className='font-medium text-sky-700 underline decoration-sky-300 underline-offset-4 transition hover:text-sky-800'
        >
          example@example.com
        </a>
        .
      </p>
    </section>
  )
}
