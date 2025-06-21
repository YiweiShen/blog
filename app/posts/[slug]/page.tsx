import { getPosts, getPostBySlug, Post } from '../../../lib/posts';
import { remark } from 'remark';
import html from 'remark-html';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;
  const post: Post = getPostBySlug(slug);
  const processed = await remark().use(html).process(post.content);
  const contentHtml = processed.toString();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-8">
        {post.date} {post.author && `| By ${post.author}`}
      </p>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}