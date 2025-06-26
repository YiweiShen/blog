"use client";

import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link';
import type { PostMeta } from '../../lib/posts';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [allPosts, setAllPosts] = useState<PostMeta[]>([]);
  const [results, setResults] = useState<PostMeta[]>([]);
  const [show, setShow] = useState(false);
  const fuse = useMemo(() => {
    if (allPosts.length === 0) return null;
    return new Fuse<PostMeta>(allPosts, {
      keys: ['title', 'summary', 'content'],
      includeScore: true,
      threshold: 0.4,
      ignoreLocation: true,
      findAllMatches: true,
    });
  }, [allPosts]);

  useEffect(() => {
    async function loadIndex() {
      try {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
        const res = await fetch(`${basePath}/search-index.json`);
        if (res.ok) {
          const data: PostMeta[] = await res.json();
          setAllPosts(data);
        }
      } catch (err) {
        console.error('Failed to load search index', err);
      }
    }
    loadIndex();
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const handler = setTimeout(() => {
      const q = query.trim().toLowerCase();
      const terms = q.split(/\s+/).filter(Boolean);
      let filtered: PostMeta[];
      if (fuse) {
        const fuseResults = fuse.search(query, { limit: 5 });
        if (fuseResults.length > 0) {
          filtered = fuseResults.map((result) => result.item);
        } else {
          filtered = allPosts.filter((post) =>
            terms.every((t) =>
              post.title.toLowerCase().includes(t) ||
              post.summary?.toLowerCase().includes(t) ||
              post.content?.toLowerCase().includes(t)
            )
          ).slice(0, 5);
        }
      } else {
        filtered = allPosts.filter((post) =>
          terms.every((t) =>
            post.title.toLowerCase().includes(t) ||
            post.summary?.toLowerCase().includes(t) ||
            post.content?.toLowerCase().includes(t)
          )
        ).slice(0, 5);
      }
      setResults(filtered);
      setShow(true);
    }, 300);
    return () => clearTimeout(handler);
  }, [query, allPosts, fuse]);

  return (
    <div className="relative">
      <input
        type="text"
        className="border rounded px-2 py-1 w-48 focus:outline-none focus:ring"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={() => setTimeout(() => setShow(false), 100)}
        onFocus={() => query && results.length > 0 && setShow(true)}
      />
      {show && results.length > 0 && (
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