# good first issue: a fourth mode preset

`/router:mode` ships `frugal | balanced | performance`. Propose and add
a fourth preset — for example `weekend` (everything one tier down, hard
cap at sonnet) or `demo` (always announce, prefer visible variety).

## Files

- `scripts/config-set.js` — accept the new value in the `mode` options
  list, add a characterful confirmation line (≤80 cols, matches the
  voice of the existing three).
- `scripts/inject.js` — insert the preset's tiebreak/directive line
  after the rubric table lines (mirror how frugal/performance do it).
- `skills/mode/SKILL.md` — extend the `description:` value (keep it on
  one line; never reflow frontmatter).
- `README.md` — extend the `/router:mode` row of the commands table
  (the only place the three presets are listed by name).

## Acceptance

- [ ] `node scripts/config-set.js mode <new>` writes config and prints
      the new confirmation; invalid values still list all options.
- [ ] The balanced directive is byte-identical to before your change
      (it is a regression golden — do not touch its lines).
- [ ] Every new printed line ≤80 columns.
