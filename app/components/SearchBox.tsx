"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import type { PostMeta } from '../../lib/posts';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PostMeta[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [allPosts, setAllPosts] = useState<PostMeta[]>([]);
  const [fuse, setFuse] = useState<Fuse<PostMeta> | null>(null);

  useEffect(() => {
    const loadIndex = async () => {
      try {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
        const res = await fetch(`${basePath}/search-index.json`);
        if (res.ok) {
          const posts: PostMeta[] = await res.json();
          setAllPosts(posts);
          const fuseInstance = new Fuse(posts, {
            keys: ['title', 'summary'],
            includeScore: true,
            threshold: 0.4,
            ignoreLocation: true,
            findAllMatches: true,
          });
          setFuse(fuseInstance);
        }
      } catch (error) {
        console.error('Error loading search index', error);
      }
    };
    loadIndex();
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setShowResults(false);
      return;
    }
    if (!fuse) return;

    const handler = setTimeout(() => {
      const q = query.trim();
      const fuseResults = fuse.search(q, { limit: 5 });
      let matches: PostMeta[];
      if (fuseResults.length > 0) {
        matches = fuseResults.map((r) => r.item);
      } else {
        const qLower = q.toLowerCase();
        matches = allPosts
          .filter(
            (post) =>
              (post.title && post.title.toLowerCase().includes(qLower)) ||
              (post.summary && post.summary.toLowerCase().includes(qLower))
          )
          .slice(0, 5);
      }
      setResults(matches);
      setShowResults(true);
    }, 300);

    return () => clearTimeout(handler);
  }, [query, fuse, allPosts]);

  return (
    <div className="relative">
      <input
        type="text"
        aria-label="Search blog posts"
        className="border rounded px-2 py-1 w-full sm:w-48 focus:outline-none focus:ring placeholder-gray-500 placeholder-opacity-60"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={() => setTimeout(() => setShowResults(false), 100)}
        onFocus={() => query && results.length > 0 && setShowResults(true)}
      />
      {showResults && results.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border mt-1 max-h-60 overflow-auto z-50">
          {results.map((post) => (
            <li key={post.slug} className="px-2 py-1 hover:bg-gray-100">
              <Link href={`/posts/${post.slug}`} className="block">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
