---
title: "Submodular Optimization for Text Selection, Passage Reranking & Context Engineering"
date: "2025-07-14"
summary: "Discover how submodular optimization offers a principled, efficient framework with theoretical guarantees for context engineering—text selection and passage reranking—and explore practical examples."
---

# Submodular Optimization for Text Selection, Passage Reranking & Context Engineering

[GitHub: jina-ai/submodular-optimization](https://github.com/jina-ai/submodular-optimization)

> After my previous article on [submodular optimization for fan-out queries in DeepResearch](https://jina.ai/news/submodular-optimization-for-diverse-query-generation-in-deepresearch), I received great feedback asking for a deeper dive into **submodularity** in information retrieval and agentic search. Today, I'll introduce two more applications of submodular optimization: **text selection** and **passage reranking**. Both address the same core challenge—optimal subset selection—for any context engineering system.

Real-world documents contain semantic redundancy: not every sentence carries equal importance for an LLM's reasoning. Imagine you have a lengthy document and need to extract the most representative information under a token budget. This is text selection: choosing content that captures the document's essence under cardinality constraints. We want selections that are _orthogonal_—minimizing shared information while maximizing total coverage. You can think of text selection as context compression: reducing token consumption while preserving semantic richness.

Passage reranking sorts candidate passages by their semantic relevance to a query. At Jina AI, we have specialized rerankers (e.g., `jina-reranker-m0`, `jina-reranker-v2-multilingual-base`), yet most rerankers—including ours—are pointwise: they score `(query, passage)` pairs independently. They ignore redundancy across high-scoring passages: if passages 1 and 3 both score high but contain similar information, you only need one. In agentic workflows like DeepResearch, when agents collect web snippets, you must pack the context window with the most informative, non-redundant snippets. This selection follows the same “minimize overlap, maximize coverage” principle as text selection, but with query relevance as a priority.

Many practitioners resort to “soft” heuristic prompts for context engineering—with no guarantees, questionable effectiveness, and no theoretical foundation. We can do much better.

In this post, I will show that both text selection and passage reranking yield to **submodular optimization**, providing rigorous solutions. If you’re unfamiliar with submodular functions, think “diminishing returns”: at each step, each new element adds value, but the marginal benefit decreases as you select more.

> A set function $f$ is submodular if, for any $A \subseteq B$ and $i \notin B$:

$$
f(A \cup \{i\}) - f(A)
\ge
f(B \cup \{i\}) - f(B).
$$

This property matches our intuition: as you cover more semantic space, each additional selection contributes less new information.

## Text Selection via Submodular Optimization

First, we illustrate text selection. Given a document $D$ with $n$ elements (tokens or sentences), select a subset $S \subseteq \{1,\dots,n\}$ of size $k$ that maximizes the coverage function:

$$
f(S) = \sum_{i=1}^n \max_{j \in S} \mathrm{sim}_{ij},
$$

where $\mathrm{sim}_{ij}$ is the cosine similarity between element embeddings $i$ and $j$. The max operation ensures each element is represented by its closest selected neighbor, avoiding double-counting.

### Get Token/Passage-Level Embeddings

For token-level selection, we use `jina-embeddings-v4`’s multi-vector mode (`return_multivector=True`) to obtain one embedding per token. For passage-level selection, we split by punctuation or newlines and embed each chunk independently. In both cases, we enable the `text-matching` LoRA adapter to measure semantic similarity within a homogeneous set of elements.

## Lazy Greedy Algorithm

We solve this submodular maximization with the lazy greedy algorithm, which yields a $(1 - 1/e) \approx 0.632$ approximation guarantee:

1. Compute initial marginal gains for all elements and store them in a priority queue.
2. At each iteration, pop the element with the highest cached gain.
3. If its gain was last updated in the current iteration, select it.
4. Otherwise, recompute its marginal gain and reinsert.

This “lazy” evaluation dramatically cuts down evaluations when gains vary significantly.

## Passage Reranking via Submodular Optimization

Passage reranking extends text selection by adding query relevance. Let $P$ be the set of candidate passages and $Q$ a set of queries. We denote:

- $s_{ij}$: cosine similarity between passages $i$ and $j$ (with `text-matching` LoRA).
- $r_{qi}$: relevance score between query $q$ and passage $i$ (with `retrieval` LoRA).

We now define two submodular functions that balance relevance and diversity.

### Facility Location Formulation

$$
f_{FL}(S) = \sum_{q=1}^Q \sum_{i=1}^P \max_{j \in S} r_{qj} \, s_{ij}.
$$

Each passage $j\in S$ covers passage $i$ weighted by its relevance $r_{qj}$. High-relevance “hubs” can cover many similar passages.

### Saturated Coverage Formulation

$$
f_{SC}(S) = \sum_{q=1}^Q \sum_{i=1}^P \min\bigl(r_{qi},\, \max_{j \in S} s_{ij}\bigr).
$$

Coverage for $i$ is capped by its own relevance $r_{qi}$, preventing over-selection of irrelevant hubs.

Both functions are monotone and submodular, so we can apply the same lazy greedy algorithm with strong approximation guarantees.

## Experimental Results

In our experiments (see the Colab notebooks below), we select the top-10 passages from various documents. All three ranking strategies—pure relevance, facility location, and saturated coverage—maintain monotonicity: increasing $k$ does not change the first $k-1$ selections. Submodular reranking loosely follows relevance scores but strategically reorders passages to minimize redundancy.

Plotting function values vs. selection size reveals classic submodular behavior: rapid initial gains, diminishing returns, and saturation plateaus. Beyond these saturation points, marginal gains $\Delta_i(S) = f(S\cup\{i\}) - f(S) \approx 0$ for all remaining $i\notin S$, signaling an automatic stopping criterion.

## Conclusions

> Context engineering—building, optimizing, and “packing” context windows—has become central to effective agentic workflows. Text selection and passage reranking are key components, from knowledge base retrieval to final context compression.

Submodular optimization delivers three compelling advantages:

1. **Theoretical guarantees**: Lazy greedy runs in $O(nk\log n)$ and achieves a $(1-1/e)$ approximation—provably at least 63% of optimal.
2. **Smart stopping**: Saturation behavior provides an automatic stopping point when marginal gains vanish.
3. **Multi-query extension**: The same framework seamlessly handles multiple queries, unlike ad-hoc prompt heuristics.

Submodularity’s mathematical foundation offers a principled, scalable framework for context engineering—far beyond heuristic prompt tuning.

---

### Try It Yourself

- [GitHub Repo](https://github.com/jina-ai/submodular-optimization)
- [Text Selection Colab Notebook](https://colab.research.google.com/drive/1J4kLSGTkcR59jM5Xc2EbIkJtoQ0CdbPE)
- [Passage Reranking Colab Notebook](https://colab.research.google.com/drive/1gMc1Bf9Lk6HqXSoA6PyMblOb943-Pgjt?usp=sharing)
