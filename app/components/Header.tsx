'use client';
import { useState, useEffect } from 'react'
import Link from 'next/link'
import SearchBox from './SearchBox'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (typeof window !== 'undefined') {
    return (localStorage.theme as Theme) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  }
  return 'light'
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.theme = theme
  }, [theme]);

  return (
    <div role="banner" className="sticky top-0 bg-surface dark:bg-surface z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" legacyBehavior>
            <a className="text-2xl font-bold text-text-primary hover:text-accent">
              blog
            </a>
          </Link>

          <nav className="hidden sm:flex space-x-6">
            <Link href="/" legacyBehavior>
              <a className="text-text-primary hover:text-accent">Home</a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a className="text-text-primary hover:text-accent">About</a>
            </Link>
            <Link href="/contact" legacyBehavior>
              <a className="text-text-primary hover:text-accent">Contact</a>
            </Link>
            <Link href="/slidev" legacyBehavior>
              <a className="text-text-primary hover:text-accent">Slides</a>
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <SearchBox />
          <button
            aria-label="Toggle dark mode"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-text-primary hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8.66-12.34l-.707.707M4.047 19.95l-.707.707M21 12h-1M4 12H3m16.243 4.243l-.707-.707M6.464 6.464l-.707-.707"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3C10.343 3 8.742 3.343 7.414 4.162a9 9 0 1011.424 11.424C20.657 15.258 21 13.657 21 12h-9z"
                />
              </svg>
            )}
          </button>
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-text-primary hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

      {menuOpen && (
        <div className="sm:hidden bg-surface dark:bg-surface border-b border-gray-200 dark:border-gray-700">
          <nav className="px-8 pb-4 space-y-2">
            <Link href="/" legacyBehavior>
              <a className="block text-text-primary hover:text-accent">Home</a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a className="block text-text-primary hover:text-accent">About</a>
            </Link>
            <Link href="/contact" legacyBehavior>
              <a className="block text-text-primary hover:text-accent">Contact</a>
            </Link>
            <Link href="/slidev" legacyBehavior>
              <a className="block text-text-primary hover:text-accent">Slides</a>
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
