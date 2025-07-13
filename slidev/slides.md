---
theme: seriph
background: "https://cover.sli.dev"
title: "Mastering GitFlow: A Structured Workflow for Scalable Git Development"
info: |
  A guide to implementing GitFlow, covering installation, branch management, core commands, and best practices.
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
---

# Mastering GitFlow: A Structured Workflow for Scalable Git Development

> Collaborating on complex software projects can get messy without a clear branching strategy. GitFlow, introduced by Vincent Driessen in 2010, provides a robust, opinionated workflow built on Git’s branching model. It helps teams:

- Enforce clear boundaries between ongoing work and production-ready code
- Support parallel feature development, scheduled releases, and urgent hotfixes
- Maintain high-quality standards with minimal merge conflicts

---

# Why GitFlow?

1. **Clarity**
   - `develop` houses integrated code that’s still evolving.
   - `main` (or `master`) always reflects production-ready code.

2. **Parallel Workstreams**
   - Feature branches off `develop`
   - Release branches prepare stabilization
   - Hotfix branches patch `main`

3. **Process Discipline**
   - Standardized naming and merge practices
   - Automated tooling (git-flow extensions) to scaffold branches

---

# Installing and Initializing GitFlow

**Install the extension**

- macOS (Homebrew):
  ```bash
  brew install git-flow-avh
  ```
- Linux (APT):
  ```bash
  sudo apt-get install git-flow
  ```

**Initialize in your repo**

```bash
git init                # if you haven’t already
git checkout -b develop # create “develop” if needed
git flow init
```
When prompted, you can accept the defaults:
```text
Branch name for production releases: [main]
Branch name for “next release” development: [develop]
Feature branches? feature/
Release branches? release/
Hotfix branches? hotfix/
Support branches? support/
Version tag prefix? [v]
```

---

# The GitFlow Branching Model

- **main**
  Production code, only updated via merges from release or hotfix branches.
- **develop**
  Integration branch for upcoming releases; all finished features go here.
- **feature/**
  Created off `develop` for new functionality (e.g., `feature/cool-login`).
- **release/**
  Spawned from `develop` when you’re feature-complete; used to stabilize, fix bugs, update docs, bump version numbers (e.g., `release/1.2.0`).
- **hotfix/**
  Branched from `main` to address urgent production bugs; merged back into both `main` and `develop` (e.g., `hotfix/urgent-fix`).

---

# Daily Workflow with GitFlow Commands

## Working on a Feature

```bash
git flow feature start cool-login
# … work on code, commit changes …
git flow feature finish cool-login
```

- `start`: creates `feature/cool-login` from `develop`.
- `finish`: merges back into `develop` and deletes the feature branch.

---

# Daily Workflow with GitFlow Commands

## Preparing a Release

```bash
git flow release start 1.2.0
# bump version number, update CHANGELOG, QA…
git flow release finish 1.2.0
```

- `start`: creates `release/1.2.0` from `develop`.
- `finish`:
  - merges into `main` and tags `v1.2.0`
  - merges into `develop` to carry over fixes
  - deletes the `release/1.2.0` branch

---

# Daily Workflow with GitFlow Commands

## Patching Production

```bash
git flow hotfix start urgent-fix
# patch bug in production
git flow hotfix finish urgent-fix
```

- `start`: creates `hotfix/urgent-fix` from `main`.
- `finish`:
  - merges into `main` and tags the new version
  - merges into `develop`
  - deletes the `hotfix/urgent-fix` branch

---

# Tips & Best Practices

- Keep feature branches small and focused; merge often.
- Regularly pull/update `develop` to minimize drift.
- Tag releases consistently for easy rollback.
- Automate tests and CI on merges (especially `develop` → `release` and `release` → `main`).
- Use clear, descriptive branch names: `feature/login-oauth`, `hotfix/203-login-error`.

---

# When to Avoid GitFlow

- Very small teams or solo projects may find GitFlow too heavyweight.
- Rapid continuous-deployment pipelines often favor simpler branching (e.g., trunk-based development).

---

# Conclusion

GitFlow brings discipline and structure to Git-based development by clearly separating feature work, release preparation, and bug fixing. It scales well for multi-developer projects with scheduled releases, helping you maintain code quality and project transparency. With just a few commands (`feature start/finish`, `release start/finish`, `hotfix start/finish`), your team can focus on delivering value—while GitFlow keeps your branches tidy and your workflow predictable.

Ready to give GitFlow a spin? Initialize it in your next project and experience the power of a standardized branching strategy. Happy coding!
