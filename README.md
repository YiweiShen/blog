[![Next.js](https://img.shields.io/npm/v/next?label=Next.js&logo=nextdotjs&logoColor=white&color=black)](https://nextjs.org/) [![TypeScript](https://img.shields.io/npm/v/typescript?label=TypeScript&logo=typescript&logoColor=white&color=blue)](https://www.typescriptlang.org/) [![Tailwind CSS](https://img.shields.io/npm/v/tailwindcss?label=Tailwind%20CSS&logo=tailwind-css&logoColor=white&color=06B6D4)](https://tailwindcss.com/) [![License](https://img.shields.io/github/license/YiweiShen/blog)](LICENSE)

# blog
Experimental Next.js blog coding with Codez.

## Single Post View

This blog now supports Markdown-based posts stored in the `posts` directory at the project root. Front-matter fields (e.g. title, date, author) are parsed automatically, and content is rendered on a dynamic single-post page at `/posts/[slug]`.

### Setup
Install the required packages:
```
npm install gray-matter remark remark-html
```
Add your `.md` or `.mdx` files to the `posts` folder with YAML front-matter and Markdown content.
