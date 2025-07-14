---
theme: seriph
background: "https://cover.sli.dev"
title: "Gemini CLI Getting Started: Bringing an AI Assistant into Your Terminal"
info: |
  A quick start guide to Gemini CLI, from installation and configuration to usage patterns and advanced scripting.
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
---

# Gemini CLI Getting Started: Bringing an AI Assistant into Your Terminal

> A quick start guide to Gemini CLI, from installation and configuration to usage patterns and advanced scripting.

---

# 1. Why Choose Gemini CLI?

- **Large Context Support**: Load millions of tokens of code, documentation, or commit history at once.
- **Instant Results**: Generate ready-to-use functions, config snippets, and script templates on demand.
- **Seamless Scripting**: Wrap frequent interactions into shell functions or Makefile targets for one-command workflows.
- **Extensible Toolchain**: Mount custom scripts or internal tools and invoke them directly within conversations.

---

# 2. Installation & Configuration

## Install Gemini CLI
Ensure you have Node.js (>=18) or Yarn:
```bash
# Quick test without global install
npx @google/gemini-cli

# Global install
npm install -g @google/gemini-cli
# or
yarn global add @google/gemini-cli
```

Verify installation:
```bash
gemini --version  # should output v0.x.x
```

## Authentication & API Key
On first run, `gemini` will open your browser for Google sign-in and store credentials locally.
To use a custom API key for higher quotas:
```bash
export GEMINI_API_KEY="YOUR_API_KEY"
```
> **Dad Joke:**
> AI Assistant: "Need higher privileges?"
> Programmer: "Want root?"
> AI: "Don't make me look up a Facebook account!" 😄

---

# 3. Basic Interactive Usage

```bash
cd ~/my-project
gemini
> Please give me an overview of the project structure and highlight the core modules.
```

**Example Response:**
```text
- src/         Main application code
  ├─ routes/   Route definitions
  ├─ services/ Business logic
  └─ models/   Data layer
- tests/       Unit & integration tests
- scripts/     Deployment & migration scripts
```

Ask for code scaffolding:
```bash
> Write an Express middleware that validates `req.body` types and strips out `password` and `token` fields.
```

Copy the generated code directly into `src/middleware/sanitize.js`.

---

# 4. Inline Mode: One-Liner Commands

```bash
gemini --inline "Generate a Python script that downloads files from a list of URLs and runs them concurrently."
```

The script is printed directly in your terminal, ready to copy or redirect to a file.

---

# 5. Scripting Conversations

Wrap frequent queries into shell functions:
```bash
function analyze() {
  gemini --inline "Read $1 and provide performance optimization suggestions."
}

# Usage:
analyze src/utils/heavy.js
```

---

# 6. Advanced Tips

- **Mount Custom Commands**: Use MCP plugins to integrate your team’s CLI tools or internal scripts for direct invocation within Gemini conversations.
- **Multi-Modal Input**: Drag & drop PDFs, Markdown files, or images into the CLI (with Multimodal access) for structure extraction and annotations.

---

# Summary

1. Install: `npm install -g @google/gemini-cli`
2. Authenticate: First-run OAuth or set `GEMINI_API_KEY`
3. Interactive: `gemini` | Inline: `gemini --inline`
4. Script & Extend: Shell functions, Makefile targets, plugins

Use Gemini CLI as your always-on AI assistant to speed up development, automate tedious tasks, and even share late-night jokes!

---

# Try It Today!

Give Gemini CLI a spin and transform your terminal into a powerful AI-driven assistant.
