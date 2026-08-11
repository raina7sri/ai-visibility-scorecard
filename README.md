# AI Visibility Scorecard

> Part of **[Aurics](https://github.com/raina7sri/aurics)** — AI-native GTM tools, built in the open. · [aurics.ai](https://aurics.ai)

A free, open-source tool to measure how AI assistants — **ChatGPT, Gemini, Perplexity, and Claude** — recommend, mention, and cite a brand when buyers ask category questions. It answers the question traditional SEO tools can't: **is my brand actually surfacing in AI search?** (Also known as AEO / Answer Engine Optimization.)

Runs entirely in the browser. No backend, no API keys, no cost. Works for any brand or category — from local services to enterprise product launches.

**Live demo:** [aurics.ai/scorecard](https://aurics.ai) · Built on Claude Code as part of an AI-native GTM measurement stack.

**Substack:** [Building the AI Visibility Tracker](https://gtmbuilder.substack.com/p/one-ai-assistant-gap-is-still-a-gtm)

**Substack:** [4 AI Tools to Answer What To Do About AEO](https://gtmbuilder.substack.com/p/experience-why-i-built-four-aeo-tools)

**Substack:** [6-Layer AEO + SEO Build Checklist for an AI-Native Marketing Engine](https://gtmbuilder.substack.com/p/framework-an-aeo-seo-build-checklist)

---

## The six metrics

| Metric | Definition |
|---|---|
| **Recommendation Rate** | % of scored responses where the brand is *actively recommended* (not merely listed) |
| **Mention Rate** | % of scored responses where the brand is named at all |
| **Share of Voice** | brand mentions ÷ (brand + competitor) mentions |
| **Citation Rate** | % of mentions where the brand's website is cited/linked as a source |
| **Accuracy** *(optional)* | factual claims about the brand that are correct ÷ claims made (needs brand ground-truth) |
| **Average Position** | mean rank when the brand is listed among options (lower is better) |

Plus a **per-assistant breakdown** — visibility differs meaningfully across ChatGPT vs Gemini vs Perplexity vs Claude, and that gap is usually where the action is.

## Why human-in-the-loop (methodology)

Scoring is manual by design. The raw model **APIs are not the consumer assistants** — they don't reproduce the live browsing/grounding that ChatGPT, Gemini, and Perplexity use to answer real users, so API runs would give misleading numbers, and scraping the consumer UIs is fragile and against ToS. The only faithful measurement is to **run the query in the real assistant, read the answer, and score what you see.** That's what this tool streamlines — and it's why it costs nothing to run.

## Quick start

1. **Download or clone** this repo.
2. **Open `index.html`** in any browser (double-click — no server needed).
3. You'll see the demo dashboard populated with a fictional brand's dataset.
4. To score your own: run each **query** in each **assistant**, then fill each row (Mentioned / Rec / Position / Cited / Accuracy / Competitors named). The dashboard recalculates live. Your data stays in your browser (`localStorage`).
5. Use **Baseline** and **Current** runs to measure before/after an optimization push. **Export CSV** to archive.

## Customize (no code changes)

Everything is in **`data.js`** — edit it and reload:

```js
window.SCORECARD_DATA = {
  brand: "Your Brand",
  competitors: ["Rival A", "Rival B", ...],
  assistants: ["ChatGPT", "Gemini", "Perplexity", "Claude"],
  queries: ["your buyer-intent query 1", ...],
  demo: { baseline: { /* pre-scored cells */ }, current: {} },
  githubUrl: "...", auricsUrl: "..."
};
```

You can also edit brand/competitors/queries live via the **Configure** panel in the UI.

## What's in the box

- `index.html` — the tool + page (only depends on `data.js`)
- `data.js` — the dataset (edit this)
- `logo.svg` — header logo
- `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` — icons
- `og-image.png` — social share card (1200×630)
- `README.md` — you're reading it
- `LICENSE` — MIT

## Notes on the demo data

The bundled dataset scores a **fictional placeholder brand ("ABC")** with **illustrative** numbers — including a Baseline and a "Current" run so you can see the before/after view — so the demo works out of the box with no real client data. Swap in your own brand and score real runs to get real numbers. The tool supports any number of queries and assistants.

## License

MIT — see [LICENSE](LICENSE). Use it, fork it, ship it.
