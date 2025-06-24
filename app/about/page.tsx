import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About page',
};

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
      <h2 className="text-4xl font-bold mb-4">About</h2>
      <p className="text-lg">
        Welcome to blog! This is a simple blog built with Next.js.
      </p>
    </div>
  );
}