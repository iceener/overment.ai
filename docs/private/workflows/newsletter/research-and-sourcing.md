# The Daily Rabbit Hole — Research & Sourcing Rules

- Every newsletter edition gets its own folder: `docs/private/workflows/newsletter/editions/edition-YYYY-MM-DD/`.

- Inside the edition folder, keep one canonical source file per source, e.g. `hackernews.md`, `youtube.md`, or `sources.md`.

- The edition date is used only for storage and traceability, not for branding in the email.

- Source files are append-only during collection: add items as they are found, do not rewrite history. Curation can mark items as `KEEP` or `DROP`, but the raw capture remains.

- Each captured item must include, in this order:
  1. Title, exact as published
  2. Canonical URL
  3. Source name + domain
  4. Category
  5. Why it matters, 1–2 sentences
  6. Suggested teaser keywords, 2–3 words, or a short punchy teaser sentence
  7. Optional metadata: publish time, author, reading time

- Category set: AI, Engineering, Product, Business, Security, Creator, Tools, Research, Opinions.

- Deduplication rule: if two links cover the same story, keep the best original source and optionally keep the second as a secondary source under the same item.

- Preference rules:
  - Prefer primary sources, official blogs, docs, papers, and release notes over commentary.
  - Prefer original reporting over summaries.
  - Prefer high-signal, low-hype writing.

- Quality bar: if you cannot write a clear “why it matters” in two sentences, the item is not ready and should be dropped or re-researched.

- Minimal quoting: do not copy large excerpts; summarize and link.

- Collection goal: 10–20 candidates, from which 5–9 will be selected for the actual email.

- When an item is selected for the newsletter draft, mark it with `KEEP` and optionally add a one-line note for the final write-up. Mark rejected items with `DROP`.

## Candidate item template

```md
## Status: CANDIDATE

1. Title: 
2. URL: 
3. Source:  — 
4. Category: 
5. Why it matters: 
6. Teaser: 
7. Optional metadata: 
```
