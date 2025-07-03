#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Directory containing source markdown files for posts.
 */
const postsDirectory = path.join(process.cwd(), 'posts');
/**
 * Filepath where the generated search index will be written.
 */
const outputPath = path.join(process.cwd(), 'public', 'search-index.json');

/**
 * Reads all markdown/mdx files in the posts directory and returns their metadata.
 * @returns Array of post metadata objects with slug, title, date, summary, and raw content.
 */
function getAllPostsMeta() {
  const postFiles = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'));
  const postsMeta = postFiles.map((file) => {
    const slug = file.replace(/\.mdx?$/, '');
    const filePath = path.join(postsDirectory, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontMatter, content } = matter(fileContents);
    return {
      slug,
      title: frontMatter.title,
      date: frontMatter.date,
      summary: frontMatter.summary,
      content,
    };
  });
  postsMeta.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return postsMeta;
}

/**
 * Generates the search index JSON file based on post metadata.
 */
function generate() {
  const postsMeta = getAllPostsMeta();
  fs.writeFileSync(outputPath, JSON.stringify(postsMeta));
  console.log(`Generated search-index.json with ${postsMeta.length} entries.`);
}

/**
 * Watches the posts directory and regenerates the search index on file changes.
 */
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