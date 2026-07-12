# Router memory

Rules I have learned, one per line, newest last. Each rule is prose to a
human and grammar to the enforcer. Format:
`- YYYY-MM-DD: <pattern> → <tier> (<reason>)`
Parser (shared verbatim with scripts/enforce.js):
`/^- (\d{4}-\d{2}-\d{2}): (.+?) → (haiku|sonnet|opus|fable) \((.+)\)$/`
Pattern: 1-3 lowercase keywords, ≤29 chars. Reason: plain ASCII, ≤40 chars.

- 2026-07-12: typo fixes → haiku (mechanical single-file edits)
- 2026-07-12: lockfile churn → haiku (generated files need no judgment)
- 2026-07-12: test file updates → haiku (mechanical test edits)
