---
name: mode
description: Set the routing mode preset - frugal, balanced, or performance. Changes how ambiguous tasks tiebreak between tiers.
disable-model-invocation: true
---

# Mode — routing presets

!`node "${CLAUDE_PLUGIN_ROOT}/scripts/config-set.js" mode $ARGUMENTS`

Relay the line above to the user exactly as printed - do not rephrase
it. If it says "mode is" or "unknown", the argument was missing or
invalid: relay it and stop. The change applies from the NEXT prompt
(this prompt's directive was built before the switch).
