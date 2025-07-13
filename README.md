[![Next.js](https://img.shields.io/npm/v/next?label=Next.js&logo=nextdotjs&logoColor=white&color=black)](https://nextjs.org/) [![TypeScript](https://img.shields.io/npm/v/typescript?label=TypeScript&logo=typescript&logoColor=white&color=blue)](https://www.typescriptlang.org/) [![Tailwind CSS](https://img.shields.io/npm/v/tailwindcss?label=Tailwind%20CSS&logo=tailwind-css&logoColor=white&color=06B6D4)](https://tailwindcss.com/) [![License](https://img.shields.io/github/license/YiweiShen/blog)](LICENSE)

# blog
Experimental Next.js blog coding with [Codez](https://github.com/YiweiShen/codez).

## Table of Contents
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Code Quality](#code-quality)

## Getting Started

### Prerequisites
- Node.js v16 or higher
- npm (v7+) or Yarn v1+

### Installation
```bash
npm install
npm run prepare
```

## Available Scripts
- `npm run dev`         Start development server (with live search index generation)
- `npm run build`       Build for production (with search index generation)
- `npm run export`      Export static files
- `npm run start`       Start production server
- `npm run lint`        Run ESLint
- `npm run format`      Format code with Prettier
- `npm run type-check`  Run TypeScript type checks
- `make`               Use Makefile for convenience (see targets)

## Code Quality
- Pre-commit hooks via Husky and lint-staged
- Consistent formatting with Prettier and EditorConfig
