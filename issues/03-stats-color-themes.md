# good first issue: optional ANSI color for the stats card

`/router:stats` renders a monochrome unicode card. Add an opt-in color
theme: tier bars in distinct ANSI colors, the headline number bold.

## Constraints

- **Off by default.** Plain output stays byte-identical to today's —
  the golden files must not change. Color only with `--color`, and
  respect `NO_COLOR` (env set → always plain).
- **Never color the skill surface.** `skills/stats/SKILL.md` forwards
  `$ARGUMENTS` to the script and relays the card verbatim into chat, so
  a user typing `/router:stats --color` must still get plain output or
  the chat fills with raw escape bytes. Gate color on
  `process.stdout.isTTY` in addition to the flag — the skill's
  expansion capture is not a TTY, so this handles it for free.
- Zero dependencies: raw escape codes, node stdlib only.
- Color codes WILL break the width math as it stands — `rule()`/`row()`
  count every code point, escapes included. Apply color to fully padded
  strings (colorize after layout), never inside anything whose length
  feeds the 60-column grid.

## Files

- `scripts/stats.js` (and optionally `scripts/week.js` for the same
  treatment).
- `skills/stats/SKILL.md` — document the flag in the description if you
  wire it through.

## Acceptance

- [ ] `node scripts/stats.js` output is byte-identical to before.
- [ ] `node scripts/stats.js --color | cat -v` prints plain (piped
      stdout is not a TTY — this is the skill-surface guarantee).
- [ ] In a real terminal, `--color` shows escapes only around fully
      padded spans; alignment unchanged.
- [ ] `NO_COLOR=1` prints plain even in a terminal with `--color`.
