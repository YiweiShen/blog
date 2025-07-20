'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import SearchBox from './SearchBox'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.theme ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      )
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.theme = theme
  }, [theme])

  return (
    <header className='sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50'>
      <div className='container mx-auto px-8 py-4 flex items-center justify-between relative'>
        <div className='flex items-center space-x-6'>
          <h1 className='text-xl font-bold'>
            <Link href='/' className='text-gray-900 hover:text-blue-500'>
              blog
            </Link>
          </h1>
          <div className='hidden sm:block'>
            <SearchBox />
          </div>
        </div>
        <button
          aria-label='Toggle menu'
          onClick={() => setMenuOpen(!menuOpen)}
          className='sm:hidden text-gray-900 hover:text-blue-500 focus:outline-none'
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
        <button
          aria-label='Toggle dark mode'
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className='ml-4 text-gray-900 dark:text-gray-100 hover:text-blue-500 focus:outline-none'
        >
          {theme === 'dark' ? (
            <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 3v1m0 16v1m8.66-12.34l-.707.707M4.047 19.95l-.707.707M21 12h-1M4 12H3m16.243 4.243l-.707-.707M6.464 6.464l-.707-.707' />
            </svg>
          ) : (
            <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 3C10.343 3 8.742 3.343 7.414 4.162a9 9 0 1011.424 11.424C20.657 15.258 21 13.657 21 12h-9z' />
            </svg>
          )}
        </button>
        {menuOpen && <div className='fixed inset-0 bg-black bg-opacity-25 z-40 sm:hidden' onClick={() => setMenuOpen(false)} />}
        <nav
          className={`${menuOpen ? 'translate-x-0' : '-translate-x-full'} absolute top-full left-0 w-full bg-white dark:bg-gray-800 sm:relative sm:top-auto sm:left-auto sm:w-auto sm:translate-x-0 transform transition-transform duration-200 ease-in-out z-50`}
        >
          <ul className='flex flex-col space-y-2 p-4 sm:flex-row sm:space-y-0 sm:space-x-6 sm:p-0'>
            <li>
              <Link href='/' className='text-gray-700 hover:text-blue-500'>
                Home
              </Link>
            </li>
            <li>
              <Link href='/about' className='text-gray-700 hover:text-blue-500'>
                About
              </Link>
            </li>
            <li>
              <Link
                href='/contact'
                className='text-gray-700 hover:text-blue-500'
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href='/slidev'
                className='text-gray-700 hover:text-blue-500'
              >
                Slides
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
