---
theme: seriph
background: "https://cover.sli.dev"
title: "Gemini CLI Introduction: Bringing AI to Your Terminal"
info: |
  From installation to advanced usage, learn how to integrate Gemini CLI into your workflows.
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
---

# Gemini CLI Introduction: Bringing AI to Your Terminal

> Imagine having an AI assistant in your shell that never complains, never clocks out, and is always ready to help you with code browsing, generation, refactoring, scripting, and more.

---

# Why Gemini CLI?

- **Massive context support**: Load millions of tokens from your project, documentation, or commit history in one go.
- **Instant code generation**: Generate ready-to-use functions, configuration snippets, or script templates based on your prompts.
- **Seamless scripting**: Wrap frequent conversations into shell functions or Makefile targets for one-command workflows.
- **Extensible toolchain**: Integrate custom scripts or internal tools into your dialogue-driven processes.

---

# Installation & Configuration

> Ensure you have Node.js (>=18) or Yarn installed.

## Install

```bash
# Try without installing
npx @google/gemini-cli

# Install globally
npm install -g @google/gemini-cli
# or
yarn global add @google/gemini-cli
```

Check the version:

```bash
gemini --version
# expect v0.x.x
```

## Authentication

First-time run opens a browser for Google login and stores credentials locally.

For API key access:

```bash
export GEMINI_API_KEY="YOUR_API_KEY"
```

---

# Basic Interactive Usage

```bash
cd ~/my-project
gemini
> Please give me an overview of the project structure, highlighting the core modules.
```

Sample response:

```
- src/
  ├─ routes/      Route definitions
  ├─ services/    Business logic
  └─ models/      Data layer
- tests/          Unit & integration tests
- scripts/        Deployment & migration scripts
```

Generate an Express middleware:

```bash
> Generate an Express middleware that validates req.body types and strips out password and token fields.
```

---

# Inline Mode: One-liners

Get quick outputs without launching the interactive session:

```bash
gemini --inline "Generate a Python script to download files from a list of URLs in parallel."
```

The script prints directly to your terminal for easy copy-paste or redirection.

---

# Scripting & Automation

Wrap common prompts into shell functions for reuse:

```bash
function analyze() {
  gemini --inline "Review $1 and suggest performance optimizations."
}

# Usage:
analyze src/utils/heavy.js
```

---

# Advanced Tips

- **Custom tool mounting**: Use MCP plugins to integrate internal CLI tools or scripts into Gemini conversations.
- **Multimodal input**: Drag & drop PDFs, Markdown files, or images into the CLI for structure extraction and annotations (requires multimodal permissions).

---

# Summary

1. **Install**: `npm install -g @google/gemini-cli`
2. **Authenticate**: run `gemini` for browser login or set `GEMINI_API_KEY`
3. **Interactive**: launch `gemini` for conversational mode; **Inline**: use `--inline` for one-liners
4. **Scripting & Plugins**: automate with shell functions and integrate custom toolchains

Treat Gemini CLI as your tireless assistant—delegate repetitive tasks, generate code snippets, and supercharge your development workflow.

---

# Thank You

Try Gemini CLI today and let AI accelerate your command-line workflows!
