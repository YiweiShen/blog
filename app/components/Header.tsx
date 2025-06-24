"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBox from "./SearchBox";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('theme');
    const initial =
      saved === 'dark' || saved === 'light'
        ? (saved as 'light' | 'dark')
        : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
  };

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-900 shadow z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between relative">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold">
            <Link href="/" className="text-gray-900 dark:text-gray-100 hover:text-blue-500">
              blog
            </Link>
          </h1>
          <div className="hidden sm:block">
            <SearchBox />
          </div>
        </div>
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-gray-900 dark:text-gray-100 hover:text-blue-500 focus:outline-none"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        <nav className={`${menuOpen ? 'block' : 'hidden'} absolute top-full left-0 w-full sm:w-auto bg-white dark:bg-gray-900 sm:relative sm:block`}>
          <ul className="flex flex-col space-y-2 p-4 sm:flex-row sm:space-y-0 sm:space-x-6 sm:p-0">
            <li>
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/ui" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                UI Demo
              </Link>
            </li>
            <li>
              <button
                onClick={toggleTheme}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 focus:outline-none"
              >
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}