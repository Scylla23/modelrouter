#!/usr/bin/env node

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const rulePattern =
  /^- (\d{4}-\d{2}-\d{2}): (.+?) → (haiku|sonnet|opus|fable) \((.+)\)$/;
const tiers = ["haiku", "sonnet", "opus", "fable"];
const agents = {
  "haiku-worker": "haiku",
  "sonnet-worker": "sonnet",
  "opus-worker": "opus",
  "fable-architect": "fable",
};
const stopwords = new Set(
  ("a an the and or to in of on for file files churn edits changes updates " +
    "tweaks fixes work tasks only").split(" "),
);

async function main() {
  let stdin = "";
  for await (const chunk of process.stdin) stdin += chunk;
  const input = JSON.parse(stdin);
  if (input.tool_name !== "Agent") return;

  const toolInput = input.tool_input || {};
  const agent = String(toolInput.subagent_type || "").split(":").pop();
  if (!Object.hasOwn(agents, agent)) return;
  const clean = value => String(value ?? "")
    .replace(/[^\x20-\x7e]/g, "").replace(/\s+/g, " ").trim().slice(0, 32);
  const summary = clean(toolInput.description) || clean(toolInput.prompt) ||
    "delegated task";
  const oneLiner = `→ ${agent} · ${summary} · /router:redo to escalate`;
  const current = tiers.includes(toolInput.model)
    ? toolInput.model
    : agents[agent];
  if (!current) return;

  const memory = fs.readFileSync(
    path.join(os.homedir(), ".router", "memory.md"),
    "utf8",
  );
  const rules = memory.split(/\r?\n/).flatMap((line) => {
    const match = line.match(rulePattern);
    return match
      ? [{ date: match[1], pattern: match[2], tier: match[3] }]
      : [];
  });
  const state = path.join(input.cwd || process.cwd(), ".router");
  let fingerprint = {};
  try {
    fingerprint = JSON.parse(
      fs.readFileSync(path.join(state, "last-prompt.json"), "utf8"),
    ) || {};
  } catch {}
  const haystack = [
    toolInput.description,
    toolInput.prompt,
    ...(Array.isArray(fingerprint.files) ? fingerprint.files : []),
    ...(Array.isArray(fingerprint.keywords) ? fingerprint.keywords : []),
    fingerprint.excerpt,
  ].join(" ").toLowerCase();
  let best;
  for (const rule of rules) {
    const tokens = rule.pattern.toLowerCase().split(/[^a-z0-9]+/)
      .filter((token) => token.length >= 3 && !stopwords.has(token));
    if (tokens.length &&
        tokens.some((token) => new RegExp("\\b" + token).test(haystack)) &&
        (!best || tiers.indexOf(rule.tier) >= tiers.indexOf(best.tier))) {
      best = rule;
    }
  }
  if (!best || tiers.indexOf(best.tier) <= tiers.indexOf(current)) {
    process.stdout.write(JSON.stringify({ systemMessage: oneLiner }));
    return;
  }

  fs.mkdirSync(state, { recursive: true });
  fs.writeFileSync(
    path.join(state, "enforce-pending.json"),
    JSON.stringify({
      ts: new Date().toISOString(),
      enforced_model: best.tier,
      enforced_from: current,
      rule: best.pattern,
      rule_date: best.date,
      agent: toolInput.subagent_type,
    }, null, 2) + "\n",
  );
  process.stdout.write(JSON.stringify({
    systemMessage: `${oneLiner}\n↑ escalated to ${best.tier} · learned rule: ` +
      `${best.pattern.slice(0, 29)} (${best.date})`,
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "allow",
      updatedInput: { ...toolInput, model: best.tier },
    },
  }));
}

main().catch(() => {
  process.exitCode = 0;
});
