import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About page',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-4">About</h2>
      <p className="text-lg text-gray-700">
        Welcome to MySite! This is a simple blog built with Next.js.
      </p>
    </div>
  );
}