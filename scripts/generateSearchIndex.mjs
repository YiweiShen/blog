#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

function getAllPostsMeta() {
  const files = fs
    .readdirSync(postsDirectory)
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
  const posts = files.map(file => {
    const slug = file.replace(/\.mdx?$/, '');
    const fullPath = path.join(postsDirectory, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      slug,
      title: data.title,
      date: data.date,
      summary: data.summary,
      content
    };
  });
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

const postsMeta = getAllPostsMeta();
const outputPath = path.join(process.cwd(), 'public', 'search-index.json');
fs.writeFileSync(outputPath, JSON.stringify(postsMeta));
console.log(`Generated search-index.json with ${postsMeta.length} entries.`);