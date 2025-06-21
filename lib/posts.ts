export interface Post {
  slug: string;
  title: string;
  date: string;
}

export const posts: Post[] = [
  {
    slug: 'hello-world',
    title: 'Hello World',
    date: '2025-06-21',
  },
  {
    slug: 'second-post',
    title: 'Second Post',
    date: '2025-06-20',
  },
];