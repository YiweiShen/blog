'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import type { PostMeta } from '../../lib/posts'

export default function SearchBox() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<PostMeta[]>([])
  const [showResults, setShowResults] = useState(false)
  const [allPosts, setAllPosts] = useState<PostMeta[]>([])
  const [fuse, setFuse] = useState<Fuse<PostMeta> | null>(null)

  useEffect(() => {
    const loadIndex = async () => {
      try {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
        const res = await fetch(`${basePath}/search-index.json`)
        if (res.ok) {
          const posts: PostMeta[] = await res.json()
          setAllPosts(posts)
          const fuseInstance = new Fuse(posts, {
            keys: ['title', 'summary', 'content'],
            includeScore: true,
            threshold: 0.4,
            ignoreLocation: true,
            findAllMatches: true,
          })
          setFuse(fuseInstance)
        }
      } catch (error) {
        console.error('Error loading search index', error)
      }
    }
    loadIndex()
  }, [])

  useEffect(() => {
    const q = query.trim()
    if (!q) {
      setResults([])
      setShowResults(false)
      return
    }
    if (!fuse) return

    const handler = setTimeout(() => {
      const fuseResults = fuse.search(q, { limit: 5 })
      let matches: PostMeta[]
      if (fuseResults.length > 0) {
        matches = fuseResults.map((r) => r.item)
      } else {
        const qLower = q.toLowerCase()
        matches = allPosts
          .filter(
            (post) =>
              (post.title && post.title.toLowerCase().includes(qLower)) ||
              (post.summary && post.summary.toLowerCase().includes(qLower)) ||
              (post.content && post.content.toLowerCase().includes(qLower))
          )
          .slice(0, 5)
      }
      setResults(matches)
      setShowResults(true)
    }, 300)

    return () => clearTimeout(handler)
  }, [query, fuse, allPosts])

  return (
    <div className='relative w-full md:w-64'>
      <svg
        className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400'
        viewBox='0 0 20 20'
        fill='none'
        aria-hidden='true'
      >
        <path
          d='M13.75 13.75L17.5 17.5M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
      </svg>
      <input
        type='text'
        className='w-full rounded-xl border border-slate-300 bg-white/80 py-2 pl-9 pr-3 text-sm text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.15)]'
        placeholder='Search posts...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={() => setTimeout(() => setShowResults(false), 100)}
        onFocus={() =>
          query.trim() && results.length > 0 && setShowResults(true)
        }
      />
      {showResults && results.length > 0 && (
        <ul className='absolute left-0 top-[calc(100%+0.5rem)] z-50 max-h-72 w-full overflow-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10'>
          {results.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className='block rounded-xl px-3 py-2 transition hover:bg-slate-50'
              >
                <p className='line-clamp-1 text-sm font-medium text-slate-900'>
                  {post.title}
                </p>
                {post.summary ? (
                  <p className='line-clamp-1 text-xs text-slate-500'>
                    {post.summary}
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
