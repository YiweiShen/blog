---
title: "Zsh Session History Under WSL: Why It Isn't Persistent by Default (and How to Fix It)"
date: "2025-07-07"
summary: "Learn how Zsh history works on WSL, why your commands sometimes vanish between sessions, and how to configure your shell for reliable, persistent history."
---

# Zsh Session History Under WSL: Why It Isn't Persistent by Default (and How to Fix It)

If you use Zsh as your interactive shell on Windows Subsystem for Linux (WSL), you've probably noticed that your familiar shell history—the list of commands you typed—sometimes doesn't survive a reboot or a new terminal window. In plain Bash or Zsh on a Linux distribution, history tends to be reliable out of the box. Under WSL, however, certain default behaviors mean that history may appear “lost” between sessions. This post explains why, and shows how you can configure Zsh for truly persistent history on WSL.

---

## How Zsh Stores History

By default, Zsh writes your command history to a file (`$HISTFILE`, often `~/.zsh_history`) when the shell exits. In a typical Linux desktop login:

- You launch a terminal window (starting a new Zsh session).  
- You type commands. Zsh keeps them in memory.  
- When you exit, Zsh dumps the in-memory history into `~/.zsh_history`.  

If you open another window after that, it reads the updated history file and you see commands from your last session.

## The WSL Twist: Parallel Sessions and Truncation

Under WSL (or any environment where you may have multiple Zsh sessions in parallel), the default history behavior causes race conditions:

1. Each Zsh session reads `~/.zsh_history` at startup into its own in-memory buffer.
2. You run commands in session A and exit: Zsh writes (truncates and then) rewrites `~/.zsh_history` with session A’s in-memory buffer.
3. Meanwhile, session B (still open) still has the old in-memory buffer from before session A wrote its history.
4. You exit session B: Zsh rewrites `~/.zsh_history` again—this time overwriting the file with B’s outdated history buffer, effectively “losing” A’s commands.

In short, the last shell to exit wins—and it clobbers history written by earlier sessions.

## Ensuring Persistent, Shared History

The remedy is to tell Zsh to append each new command to the history file (and optionally share it across all running shells) instead of rewriting it on exit. You can enable this in your `~/.zshrc`:

```bash
# ~/.zshrc (add towards the top, before any plugins or themes)

# History file and size
export HISTFILE=~/.zsh_history
export HISTSIZE=10000
export SAVEHIST=10000

# Append each command to the history file, don't overwrite it
setopt APPEND_HISTORY

# Write to the history file immediately, as each command finishes
setopt INC_APPEND_HISTORY

# Share history across all running Zsh sessions
setopt SHARE_HISTORY

# Optional: ignore duplicate commands and excess blanks
setopt HIST_IGNORE_DUPS
setopt HIST_REDUCE_BLANKS

# Optional: record timestamp for each command
setopt EXTENDED_HISTORY
```

These options do the heavy lifting:

- **APPEND_HISTORY**: On exit, append the session’s history to `HISTFILE` instead of rewriting the entire file.  
- **INC_APPEND_HISTORY**: After each command, append it directly to the history file (rather than waiting for shell exit).  
- **SHARE_HISTORY**: On each prompt, merge the current session’s history with the contents of `HISTFILE`, then append new lines at exit. This keeps all shells in sync.  

With this configuration, commands you run in one WSL window appear immediately in other windows, and you lose nothing when you close or reboot your WSL distribution.

## Dealing with Abrupt Termination

WSL sessions can sometimes terminate abruptly (e.g., if WSL is shut down or your machine sleeps). If you want maximum safety, you can force a history write on every prompt via a Zsh hook:

```bash
# Save history after each command (even on crashes)
autoload -Uz add-zsh-hook
add-zsh-hook precmd () { fc -AIh }
```

Here, `fc -AIh` reads and appends new history lines immediately before each prompt. This helps ensure you won’t lose the few commands you just typed, even if your shell doesn’t exit cleanly.

## Summary

Out of the box, Zsh’s default history settings can lead to lost or non-persistent history under WSL, especially with parallel sessions. By enabling `APPEND_HISTORY`, `INC_APPEND_HISTORY`, and `SHARE_HISTORY` (and optionally a small Zsh hook), you regain the reliable, persistent command history you expect from a native Linux shell.

Happy Histing! 🐚
