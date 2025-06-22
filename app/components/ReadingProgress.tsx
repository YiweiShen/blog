'use client';

import { useState, useEffect } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const totalScroll = scrollHeight - clientHeight;
      const currentProgress = totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 0;
      setProgress(currentProgress);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
      <div
        className="h-1 bg-blue-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}