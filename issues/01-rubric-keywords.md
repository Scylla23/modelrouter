# good first issue: teach the audit classifier more vocabulary

The audit-mode classifier (`scripts/inject.js`) buckets prompts with a
20-keyword list split across four tiers (`AUDIT_BUCKETS`). Real prompts
say things the list misses: "optimize", "benchmark", "typos", "lint",
"scaffold", "prototype", …

## Task

Add 4–8 new keywords, each to exactly one tier bucket.

## Constraints

- The `keywords` array (the prompt fingerprint) and the four
  `AUDIT_BUCKETS` arrays must stay an exact partition: every keyword in
  exactly one bucket, no bucket entry missing from `keywords`.
- Keep the classifier table in `docs/how-it-works.md` in sync — it
  documents rows 1–4 verbatim, and the prose below it says "the same
  20-keyword list": update that count too.
- Keywords are matched as whole lowercase words; pick unambiguous stems
  ("benchmark", not "bench").

## Acceptance

- [ ] For each new keyword: a one-line worked example prompt in the PR
      description and the tier it classifies to.
- [ ] `keywords` and the buckets still partition exactly (a 5-line node
      assert in the PR description is enough).
- [ ] The table AND the keyword count in docs/how-it-works.md match
      the code.
