'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SearchBox from './SearchBox'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/slidev', label: 'Slides' },
    { href: '/magic', label: 'Magic' },
  ]

  return (
    <header className='sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl'>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-4'>
        <div className='flex items-center gap-4 md:gap-8'>
          <h1 className='font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-slate-950'>
            <Link href='/' className='transition hover:text-sky-600'>
              Blog
            </Link>
          </h1>
          <div className='hidden md:block'>
            <SearchBox />
          </div>
        </div>
        <button
          aria-label='Toggle menu'
          onClick={() => setMenuOpen(!menuOpen)}
          className='rounded-xl border border-slate-300 p-2 text-slate-700 transition hover:border-slate-400 hover:text-slate-900 sm:hidden'
        >
          {menuOpen ? (
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          ) : (
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          )}
        </button>
        <nav
          className={`${
            menuOpen ? 'block' : 'hidden'
          } absolute left-0 top-full w-full border-b border-slate-200 bg-white px-6 py-4 sm:static sm:block sm:w-auto sm:border-none sm:bg-transparent sm:p-0`}
        >
          <ul className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-1'>
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex rounded-xl px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'border border-sky-200 bg-sky-50 text-sky-800'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
            <li className='pt-2 sm:hidden'>
              <SearchBox />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
