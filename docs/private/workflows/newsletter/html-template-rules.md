# The Daily Rabbit Hole — HTML Template Rules

- Brand name: **The Daily Rabbit Hole**.

- Use a minimal HTML email.

- Use a single outer container table, centered, with a max width around 600px, a white background, and generous padding so it reads like a clean document, not a UI.

- Use only inline styles. No `<style>` blocks, no external CSS, no classes, no fancy selectors, and no relying on client defaults.

- Include a plain-text preview at the very top before the HTML version so email previews are useful and stripped clients still get value.

- The email must start with an **Edition Overview** block: 1–3 short sentences that summarize the entire edition. This is separate from the plain-text preview.

- Naming is part of the product. Keep the edition identifier keyword-based, not date-based. The date should not appear in the title or branding line.

- Edition identifier format:

```txt
#EDITION_NUMBER • TEASER_KEYWORDS
```

Examples:

```txt
#17 • Cursor rules • Agent workflows • Quiet wins
#42 • Builder mode • Shipping • 7 items
```

- Current edition number: **#69 from 2026-04-07**. Update this number and date after preparing an approved draft.

- Typography hierarchy is mandatory:
  1. Main title: newsletter name.
  2. Secondary line: edition keyword + item count.
  3. Optional short subtitle/summary.
  4. Repeating item blocks where the title is strongest, the description is normal-weight, and metadata/source is muted.

- Strict newsletter item structure:
  1. Title, clickable link.
  2. Description, 1–3 sentences.
  3. Source line: publisher + domain, linked to canonical URL.
  4. Optional metadata: category/tag; avoid dates unless explicitly useful.

- Titles must always be links.

- Link styling must be consistent and email-safe: visible link color plus underline, or visible link color plus bold, but not both everywhere.

- Description text must be constrained so one item cannot dominate the email.

- Sources must be explicit and standardized, e.g. `Reuters • reuters.com`.

- Separate items with subtle dividers, 1px light gray, and spacing. Avoid heavy borders everywhere.

- If grouping is used, sections must be simple: a small uppercase section label with a count, followed by items. No nested subsections.

- Email-safe interaction only:
  - `<a>` links only.
  - No JavaScript.
  - No hover-dependent behavior.
  - No accordions.
  - No CSS animations.

- Add a “read later / archive” affordance only if it is a simple link. Otherwise omit it.

- Rely on table cell padding and `<tr><td>` spacing patterns, not margin hacks that some clients strip.

- Safe colors:
  - Text: `#111` / `#222`
  - Muted metadata: `#666` / `#777`
  - Divider: `#eee` / `#e6e6e6`
  - One link color that passes contrast

- Add a footer with:
  1. Compact legend explaining what the email is.
  2. Consistent `generated at TIME (TZ)` timestamp for traceability.

- For mailing-list sends, prepare a draft only. Human review is required before sending.
