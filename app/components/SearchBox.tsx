"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { PostMeta } from '../../lib/posts';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PostMeta[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const handler = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data: PostMeta[] = await res.json();
        setResults(data.slice(0, 5));
        setShow(true);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

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