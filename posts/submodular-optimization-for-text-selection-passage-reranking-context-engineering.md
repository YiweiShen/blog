---
title: "Efficient Context Engineering with Submodular Optimization"
date: "2025-07-14"
summary: "Discover how submodular optimization offers a principled, efficient framework with theoretical guarantees for context engineering—text selection and passage reranking—and explore practical examples."
---

# Efficient Context Engineering with Submodular Optimization


Last month, during my deep dive into [submodular optimization for fan‑out queries in DeepResearch](https://jina.ai/news/submodular-optimization-for-diverse-query-generation-in-deepresearch), I stumbled upon an intriguing challenge: How do we pack the most meaningful bits of text into a limited context window without repeating ourselves? In this investigation, I followed the trail of research papers, notebook experiments, and code repositories to uncover a surprising answer: submodular optimization.

Imagine you’re a museum curator faced with hundreds of artifacts and only room for a handful. You want the collection to represent the whole exhibit: no two items that tell the same story, yet together they weave a coherent narrative. That tension between *coverage* and *redundancy* is at the heart of two critical tasks in modern AI workflows:

1. **Text Selection**: Extracting the richest sentences or passages from a document under a token‑budget constraint.
2. **Passage Reranking**: Ordering candidate snippets so that top results are both relevant to a query and diverse from each other.

Both problems ask, “Which pieces of text are most valuable, given diminishing returns as you add more?” That, in a nutshell, is the power of submodular functions.

---

## What Is Submodularity, Really?

At its core, a submodular function captures the principle of *diminishing returns*. As you collect more items, each additional one tends to offer a smaller marginal gain. Formally, for any two sets $A \subseteq B$ and item $i\notin B$:

$$
f(A \cup \{i\}) - f(A)
\ge
f(B \cup \{i\}) - f(B).
$$

This inequality ensures that early choices matter more than later ones—perfect for maximizing coverage without redundancy.

---

## Case Study 1: Text Selection for Meeting Summaries

Last week, I sat in on a two‑hour design review meeting with twenty participants. By the time my battery died, I had a 30‑page transcript. My mission: pick the ten most informative sentences to feed into an LLM for a concise summary.

### From Transcript to Embeddings

First, I chunked the transcript by sentences and called the `jina-embeddings-v4` model (with the `text-matching` LoRA adapter). Suddenly each sentence became a 768‑dimensional vector.

### Defining a Coverage Function

To measure how well a subset $S$ represents all sentences, I used:

$$
f(S)
\;=\;
\sum_{i=1}^n
  \max_{j\in S}
  \mathrm{cosim}(x_i, x_j),
$$

where $\mathrm{cosim}(\cdot,\cdot)$ is cosine similarity. Intuitively, each sentence $i$ is “covered” by its closest selected neighbor $j$, so we avoid double‑counting similar lines.

### Lazy Greedy to the Rescue

I applied the classic *lazy greedy* algorithm:

```python
selected = set()
marginal_gains = initialize_gains(all_sentences)
for _ in range(k):
    while True:
        idx, gain, last_updated = pop_top(marginal_gains)
        true_gain = compute_gain(selected, idx)
        if last_updated == current_round:
            selected.add(idx)
            break
        push(marginal_gains, (idx, true_gain, current_round))
```

In minutes, I had ten sentences that told the story arc of the meeting: design decisions, blockers, and next steps—without repetition.

---

## Case Study 2: Passage Reranking for Diverse Search Results

Next, I turned my attention to search. Suppose you query “impact of climate policy,” and a pointwise reranker returns ten almost‑identical news snippets about a single bill. Boring. We want the top results to be *both* relevant and varied.

### Blending Relevance with Diversity

I gathered 50 candidate passages and computed:

- **Relevance** $r_{q,i}$: cosine similarity between query $q$ and passage $i$.
- **Inter‑passage similarity** $s_{i,j}$: cosine similarity between passages.

Two submodular recipes emerged:

#### 1. Facility Location

$$
f_{\mathrm{FL}}(S)
=
\sum_{i}
  \max_{j\in S}
  \bigl(r_{q,j}\times s_{i,j}\bigr).
$$

Here, “hub” passages $j$ both cover similar items $i$ and carry high relevance scores $r_{q,j}$.

#### 2. Saturated Coverage

$$
f_{\mathrm{SC}}(S)
=
\sum_{i}
  \min\Bigl(r_{q,i},\,\max_{j\in S} s_{i,j}\Bigr).
$$

This variant caps coverage by each passage’s own relevance, so you don’t over‑select hubs that are irrelevant.

I ran lazy greedy on both functions and watched the result. The top‑5 lists shifted subtly:

| Rank | Pointwise | Facility Loc. | Saturated |
|:----:|:---------:|:-------------:|:---------:|
| 1    | Snippet A | Snippet A     | Snippet A |
| 2    | Snippet B | Snippet C     | Snippet D |
| 3    | Snippet C | Snippet B     | Snippet B |
| …    | …         | …             | …         |

Suddenly, the reranked results read like a mini‑survey of the topic, not an echo chamber.

---

## Lessons Learned & Next Steps

1. **Context Engineering Is an Art and a Science**  \
   Heuristic prompts can work, but submodularity delivers guarantees: you know you’re within $(1 - 1/e)$ of optimal.
2. **Lazy Greedy Means Speed**  \
   In practice, the “lazy” trick reduces similarity computations by 70–90%.
3. **Automatic Stopping**  \
   When marginal gains fall below a threshold, the algorithm signals that it’s time to stop adding more snippets.
4. **Multi‑Query Extensions**  \
   Need to optimize for several queries at once? Just sum their submodular scores and run the same pipeline.

I’ve packaged all experiments into two Colab notebooks so you can follow the breadcrumbs yourself.

---

### Try It Yourself

- [GitHub Repo](https://github.com/jina-ai/submodular-optimization)  \
- [Text Selection Notebook](https://colab.research.google.com/drive/1J4kLSGTkcR59jM5Xc2EbIkJtoQ0CdbPE)  \
- [Passage Reranking Notebook](https://colab.research.google.com/drive/1gMc1Bf9Lk6HqXSoA6PyMblOb943-Pgjt?usp=sharing)
