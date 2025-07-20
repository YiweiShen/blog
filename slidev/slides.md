---
theme: seriph
background: "https://cover.sli.dev"
title: "Prompt Engineering Best Practices"
info: |
  Clear, context-rich prompts for better AI outputs.
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
---

# Prompt Engineering Best Practices

## Agenda
- General Principles
- Controlling Output Format
- Thinking & Tool Strategies
- Code & Visual Generation Tips
- Summary

---

# General Principles

> Get clearer, more accurate AI responses by applying these core techniques.

1. **Be explicit with instructions**
2. **Add context & explain the “why”**
3. **Provide precise examples & details**

---

# Be Explicit with Instructions

> Claude responds best to clear, detailed directives.

**Less effective:**
```
Create an analytics dashboard
```
**More effective:**
```
Create an analytics dashboard. Include as many relevant features and interactions as possible. Go beyond the basics to deliver a fully featured implementation.
```

---

# Add Context to Improve Performance

> Explaining “why” helps the model understand your goals.

**Less effective:**
```
NEVER use ellipses
```
**More effective:**
```
Your response will be read aloud by a text-to-speech engine, so never use ellipses—otherwise the engine won’t know how to pronounce them.
```

---

# Be Vigilant with Examples & Details

> The model mirrors examples you provide—ensure they align with desired behavior and avoid reinforcing unwanted patterns.

---

# Controlling Output Format

> Use these techniques to steer response formatting.

1. **Tell the model what to do, not what not to do**
2. **Use XML-like tags to wrap output**
3. **Match prompt style to desired format (Markdown, JSON, etc.)**

---

# Thinking & Tool Strategies

> Leverage advanced capabilities for complex tasks.

**Interleaved Thinking:**  
`After receiving tool results, reflect on quality and plan next steps before proceeding.`

**Parallel Tool Calling:**  
`Invoke multiple independent tools simultaneously for efficiency.`

**Clean Up Temp Files:**  
`If you create any helper scripts or files, remove them at the end of the task.`

---

# Code & Visual Generation Tips

> Encourage detail and polish in code and frontend designs.

- “Include as many relevant features and interactions as possible.”
- “Add hover states, transitions, and micro‑interactions.”
- “Apply design principles: hierarchy, contrast, balance, movement.”

---

# Avoid Hard‑Coding & Focus on Robustness

> Prioritize general-purpose solutions over test-specific hacks.
>
`Please implement a maintainable solution that works for all valid inputs. Do not hard-code values to pass tests.`

---

# Summary & Next Steps

**General Principles:** Be explicit, add context, use precise examples  
**Format & Thinking:** Control output, interleave reasoning, clean up tools  
**Code & Design:** Encourage polish, avoid hard-coding  

> Practice these to get the most out of AI assistants in your workflows.

---

# Thank You!

> Questions? Reach out to discuss more prompt engineering tips.
