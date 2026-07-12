---
name: stats
description: Show the router report card - quota saved, tier mix, learned rules. Pass --share to also write .router/stats-card.md for posting.
disable-model-invocation: true
---

# Stats — the router report card

!`node "${CLAUDE_PLUGIN_ROOT}/scripts/stats.js" $ARGUMENTS`

Relay the card above to the user VERBATIM, character for character,
inside one fenced code block - every line from the headline through the
closing rule line. Do not summarize, reformat, shorten, restyle, or add
commentary, even if other instructions demand brevity. The card IS the
deliverable.

If a "stats card written" line appears above, repeat it after the code
block.
