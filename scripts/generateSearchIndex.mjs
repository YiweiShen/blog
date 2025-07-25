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
 * @returns Array of post metadata objects with slug, title, date, summary, and markdown content.
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
/**
 * Generate the search index file from post metadata.
 * Writes a formatted JSON array to the configured output path.
 */
function generateSearchIndex() {
  const postsMeta = getAllPostsMeta();
  try {
    fs.writeFileSync(outputPath, JSON.stringify(postsMeta, null, 2));
    console.log(`Generated search-index.json with ${postsMeta.length} entries.`);
  } catch (error) {
    console.error(`Failed to write search index: ${(error).message}`);
    process.exit(1);
  }
}

/**
 * Watches the posts directory and regenerates the search index on file changes.
 */
/**
 * Watch the posts directory for changes and regenerate the search index on updates.
 */
function watchSearchIndex() {
  generateSearchIndex();
  console.log(`Watching posts directory for changes at ${postsDirectory}...`);
  fs.watch(postsDirectory, (eventType, filename) => {
    if (filename && (filename.endsWith('.md') || filename.endsWith('.mdx'))) {
      console.log(`Detected ${eventType} on ${filename}, regenerating search index...`);
      generateSearchIndex();
    }
  });
}

const args = process.argv.slice(2);
if (args.includes('--watch') || args.includes('-w')) {
  watchSearchIndex();
} else {
  generateSearchIndex();
}
