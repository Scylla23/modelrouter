---
name: reflect
description: Rewrite router memory from the routing log - turn repeated redos and escalations into dated rules, prune contradicted ones. User-invoked; edits ~/.router/memory.md.
context: fork
agent: router:haiku-worker
disable-model-invocation: true
---

# Reflect — learn routing rules from the log

Rewrite ~/.router/memory.md from the routing log. Follow exactly:

0. Read exactly two files with the Read tool:
   - `~/.router/memory.md` — the user-level memory file.
   - `./.router/log.jsonl` — the routing log inside the CURRENT project
     directory (where you were invoked). This is a DIFFERENT .router
     directory from the one in your home directory; do not look for the
     log in ~/.router.
   If ./.router/log.jsonl is missing or empty, report that there is
   nothing to learn from yet and stop. If memory.md is missing, treat it
   as having no rules. Use only the last 40 log lines.
1. Signals: ONLY log entries with flags.redo true (tier redo_from was
   too low; the entry's model is where it landed) or flags.enforced true
   (rule confirmed working). An entry whose flags are all false is NEVER
   a signal — the log usually holds pairs (an unflagged original plus
   its flagged redo, same task); such a pair is ONE signal: the flagged
   entry. Two entries with the same task text are one signal, not two.
   If BOTH entries of a pair are flagged (an enforced task that was then
   redone), the LATER entry is the signal — a redo after an enforcement
   means the rule's tier was still too low, a contradiction, not a
   confirmation.
2. Tokenize each signal: lowercase its task text and split on every
   character that is not a-z or 0-9; keep tokens of 3+ characters that
   are not stopwords (list in point 3); add fingerprint.keywords and
   fingerprint.files tokenized the same way. Example: task "Fix typo in
   auth.js" gives fix, typo, auth. A pattern earns a rule when the SAME
   token appears in the token sets of 2 or more signals with DIFFERENT
   task texts. A token seen in only one signal earns nothing, no matter
   how strong it looks. The rule's tier is the tier those tasks LANDED
   on (entry model); if the signals landed on different tiers, use the
   highest of them, never anything higher.
3. Rewrite the file with the Write tool. Output contract — every point is
   mandatory:
   - Keep the header (everything above the first `- ` line) byte-identical.
   - Every rule line must match, character for character:
     `/^- (\d{4}-\d{2}-\d{2}): (.+?) → (haiku|sonnet|opus|fable) \((.+)\)$/`
   - Pattern: 1-3 lowercase ASCII keywords, ≤29 chars. Reason: plain
     ASCII, ≤40 chars. Date: today, YYYY-MM-DD.
   - The pattern must contain at least one keyword of 3+ characters that
     is NOT one of these (the enforcer ignores them): a an the and or to
     in of on for file files churn edits changes updates tweaks fixes
     work tasks only. A rule without such a keyword can never match —
     do not write it.
   - Newest last. One rule per pattern: if a pattern already has a rule,
     REMOVE the old line and append the updated rule (new tier/date/
     reason) at the end — an updated rule is the newest. Never duplicate.
   - Prune a rule only when ≥2 redo signals with different task texts
     contradict its tier on matching tasks. ONE contradicting signal
     changes nothing. Never touch rules the log says nothing about.
   - Max 12 rules; if over, drop the oldest first.
4. No new signals → change nothing and say so.
5. Re-read the file after writing; if any rule line fails the regex, fix
   it before finishing.
6. Report one line per rule added, updated, or pruned. Do not delegate.
