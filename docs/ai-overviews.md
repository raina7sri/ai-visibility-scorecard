# AI Overviews: bounded collection and acceptance design

24 October 2026. No live collection, paid API or schedule enabled.

## Recommended route

Begin with a small supervised manual sample in actual Google Search. Use the v2 Scorecard to distinguish AIO presence, absence and collection failure. Add automation only if repeated observations lead to useful decisions and the collection route proves faithful to that surface.

A vendor SERP API may later supply structured overview text and references. Record it as vendor-collected search evidence, not as a consumer-assistant API response or a view observed directly by this operator. Keep that series separate until matched-query validation establishes comparability. Do not equate source-card order with brand recommendation rank.

## Three distinct evidence streams

- Controlled query sample: which questions trigger an overview and what it says/cites under recorded conditions.
- Native GSC reporting, where exposed: real property impressions by available dimensions. Not complete answer text or competitor recommendations.
- GA4/CRM: attributable visits and verified business outcomes. Not total AI discovery.

Google's June 2026 announcement describes dedicated generative-AI impression reporting. Its standard Search Analytics reference lists web/image/video/news/discover/googleNews types without establishing a dedicated AIO type. Verify actual account exports and connector coverage; do not invent an API field. Older Google documentation still describes aggregate Web reporting, so preserve source dates and report scope.

## Collection record

Record stable query ID/version and exact text; discovery/evaluation cohort; exact business/entity and owned domains; surface `Google AI Overviews`; timestamp/timezone; country/local area; device; language; account/session/personalization notes; collection method/provider/version; overview appeared/absent/error; exact overview text or durable evidence; all cited URLs; brand mention and recommendation separately; only meaningful explicit brand rank; accuracy against dated ground truth; competitor mentions; limitations.

The app's mode field can hold session/account context and its notes field can retain query-version and entity-resolution notes. For a pilot freeze the configuration in a dated JSON backup. A richer automated adapter should store these as structured fields and retain the raw provider payload.

For local businesses, national-brand mention does not establish the local center was recommended. Record exact local identity. Never use private parent/child data.

## Status rules

- `not_run`: no attempt; excluded.
- `complete`: overview visibly present and answer assessed, including valid all-negative answers.
- `no_overview`: successful search inspection found no overview. Included only in valid-search and trigger denominators.
- `unavailable`: access/request failure or deferred secondary retrieval. Excluded, never classified as no overview.
- `invalid`: wrong surface/location, ambiguous capture, contradictory scores or insufficient retrieval for assessment; investigate.
- `legacy_review`: pre-v2 data not accepted under the new contract.

A vendor payload containing an overview page token is not a completed overview and is not evidence of absence. Retrieve the required secondary result or record failure. SerpApi documents that these tokens can expire within one minute; revalidate current provider behavior before building a collector. Provider error fields also mean collection failure, not zero visibility.

## Feasibility sample and exit

For one authorized site, select six existing high-value customer questions: four unbranded discovery and two branded evaluation. Repeat each twice on separate sessions/days under fixed geography/device/language: twelve planned searches. This is an operational feasibility check, not a statistically representative baseline or market benchmark. Freeze prompt text before collection. Record every failed/absent result.

Accept only after an independent reviewer can trace every scored row to evidence, formulas reproduce, no-overview and failures are separated, and at least one useful decision or justified no-action is produced. Expand coverage/cadence only on demonstrated value. No second Watchtower task.

## Primary sources

- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports
- https://developers.google.com/webmaster-tools/v1/searchanalytics/query
- https://serpapi.com/ai-overview

Provider documentation establishes a potential collection route, not acceptance of its accuracy, cost or access for this user. No vendor purchase is recommended before the manual feasibility check.
