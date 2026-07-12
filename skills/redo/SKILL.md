---
name: redo
description: Re-run the last routed task one model tier up (haiku → sonnet → opus → fable). User-invoked escalation when the previous result missed.
disable-model-invocation: true
---

# Redo — escalate the last routed task

Last delegation (from .router/log.jsonl):

!`node "${CLAUDE_PLUGIN_ROOT}/scripts/last-task.js"`

Re-run that task one tier up. Follow these steps exactly:

1. If the context above says "last-task: none", tell the user there is
   nothing to redo and stop.
2. The target is the `next:` line above. Exactly one tier up - never skip
   tiers, never stay at the same tier (unless already at fable).
3. Print the routing one-liner, then delegate:
   `→ <agent> · <task summary ≤32 chars> · /router:redo to escalate`
   The summary is plain ASCII - no arrows, emoji, or unicode beyond the
   line's own `→` and `·`.
4. Delegate the SAME task to the target agent. If the `next:` line says
   `(model: fable)`, pass model "fable" in the Agent tool call - the
   per-invocation model outranks the agent's default. Use the full task
   prompt from your conversation context if you delegated it this session;
   otherwise reconstruct it faithfully from the `last-task:` line above.
   Do not modify, shrink, or expand the task.
5. Relay the new result to the user.
