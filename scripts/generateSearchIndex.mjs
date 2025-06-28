#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');
const outputPath = path.join(process.cwd(), 'public', 'search-index.json');

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

function generate() {
  const postsMeta = getAllPostsMeta();
  fs.writeFileSync(outputPath, JSON.stringify(postsMeta));
  console.log(`Generated search-index.json with ${postsMeta.length} entries.`);
}

function watch() {
  generate();
  console.log(`Watching ${postsDirectory} for changes...`);
  fs.watch(postsDirectory, (eventType, filename) => {
    if (!filename) return;
    if (filename.endsWith('.md') || filename.endsWith('.mdx')) {
      console.log(`Detected ${eventType} on ${filename}, regenerating search index...`);
      generate();
    }
  });
}

const args = process.argv.slice(2);
if (args.includes('--watch') || args.includes('-w')) {
  watch();
} else {
  generate();
}