import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact page',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-4">Contact</h2>
      <p className="text-lg text-gray-700">
        Feel free to reach out via email at{' '}
        <a
          href="mailto:example@example.com"
          className="text-blue-600 hover:underline"
        >
          example@example.com
        </a>.
      </p>
    </div>
  );
}