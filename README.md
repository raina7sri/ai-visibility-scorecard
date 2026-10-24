# AI Visibility Scorecard

A local browser tool for **manual** observations of ChatGPT, Gemini, Perplexity, Claude and **Google AI Overviews**. It does not query or scrape these products. Google AI Overviews is separate from Gemini and AI Mode.

Open `index.html` locally or host these static files. `data.js` contains synthetic examples, `scoring.js` defines versioned metrics, and `app.js` provides editing, filters and export. No keys or backend are required for manual scoring. Your assistant access may have its own costs.

## Collect and score

1. Export existing v1 data before updating where possible. V1 browser storage is preserved. Imported legacy rows are excluded as `legacy_review` until explicitly reviewed; v2 is stored separately.
2. Configure brand, competitors, queries and surfaces. Changing brand starts empty runs. Classify prompts as discovery, evaluation or unclassified. The dashboard defaults to discovery and excludes AI Overviews from combined assistant reporting.
3. Ask the exact prompt in the actual product. For AI Overviews, use a Google Search query and observe the overview, not the local pack, organic links, Gemini or AI Mode.
4. Record capture time (ISO with timezone), evidence reference, location, device, language, product/mode and collection method. Do not put private customer details in public evidence links.
5. Mark `complete` only for a collected answer. All-negative complete rows count. Use `no_overview` only for a successfully observed search with no overview; use `unavailable` or `invalid` for collection failure. Empty/unrun rows never mean zero visibility.
6. Score brand mention, active recommendation, owned-site citation, explicit list position, accuracy and named tracked competitors. Leave position blank for unranked prose. A site can be cited without the brand being named.
7. Review validation and provenance warnings. Export CSV for analysis and JSON for a full backup. CSV neutralizes formula-like cells; use JSON to preserve exact text. Raw responses/screenshots remain at the evidence reference, not inside the export unless recorded in notes.

## Formula contract: visibility-v2

Every answer metric reports numerator/denominator; zero denominators are not estimable. Only valid complete responses count as answers. Invalid combinations are excluded and surfaced.

| Metric | Formula |
|---|---|
| Mention | Mentioned / complete valid answers |
| Recommendation | Actively recommended / complete valid answers |
| Owned-site citation | Site cited / complete valid answers |
| Citation among mentions | Both named and site cited / mentioned answers |
| Sample share of voice | Named brand observations / (named brand + distinct tracked-competitor observations) |
| Fully correct responses | Correct / (Correct + Partial + Wrong) accuracy-scored responses |
| Average observed position | Mean positive integer rank where explicitly provided |
| AI Overview trigger | Overview present / valid searches, including no-overview searches |
| AIO citation across searches | Site cited / valid searches, including no-overview searches |

Answer metrics on the AI Overviews surface are conditional on an overview appearing. The two additional search metrics retain successfully observed no-overview searches. Request failures do not enter either denominator. Branded evaluation and unbranded discovery are separate cohorts. These measures are prompt-sample descriptions, not market share or measured impressions.

## Comparison and limitations

Baseline and Current are descriptive snapshots, not causal lift. Match query set, cohort, engine/mode, geography, device, language, collection method and coverage before interpretation. Keep evidence; exclude synthetic examples from real reporting. Version 1 figures are not directly comparable with v2; recompute original raw observations if available. Historical public metrics are not substantiated by the fictional demo dataset.

AI Overview support in this change is **manual capture and scoring**. Automated collection and native GSC reporting require separate source validation and are not implemented here. No paid service is enabled by this repository. See [AI Overviews collection design](docs/ai-overviews.md).

## Validation

Run `node --test tests/scoring.test.js` and `node --check app.js`. Automated tests cover denominators, valid negatives, missing observations, AIO trigger states, accuracy, ranks, migration and CSV safety. Browser rendering, browser-storage migration, actual CSV download and a supervised real collection remain acceptance checks before merging/deployment.

## License

MIT — see LICENSE in the upstream repository.
