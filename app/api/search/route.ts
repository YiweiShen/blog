import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts } from '../../../lib/posts';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase() || '';
  const posts = getAllPosts();
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(q)
  );
  return NextResponse.json(filtered);
}