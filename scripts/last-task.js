#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const tiers = ["haiku", "sonnet", "opus", "fable"];
const agents = {
  haiku: "haiku-worker",
  sonnet: "sonnet-worker",
  opus: "opus-worker",
  fable: "fable-architect",
};
const none = "last-task: none — no delegations logged in this repo yet.";

function main() {
  try {
    const dryRun = process.argv.includes("--dry-run");
    const state = path.join(process.cwd(), ".router");
    const lines = fs.readFileSync(
      path.join(state, "log.jsonl"),
      "utf8",
    ).split(/\r?\n/).filter((line) => line.trim());
    if (!lines.length) throw new Error();

    const entry = JSON.parse(lines.at(-1));
    const task = String(entry.task || "").slice(0, 60);
    const model = tiers.includes(entry.model) ? entry.model : "sonnet";
    const next = tiers[Math.min(tiers.indexOf(model) + 1, tiers.length - 1)];
    const agent = String(entry.agent || "").split(":").at(-1);
    let nextLine = `next: ${next} via ${agents[next]}`;
    if (next === "fable" && agent !== "fable-architect") {
      nextLine = model === "fable"
        ? "next: fable via opus-worker (model: fable, already top tier)"
        : "next: fable via opus-worker (model: fable)";
    } else if (next === "fable" && model === "fable") {
      nextLine = "next: fable via fable-architect " +
        "(already top tier - re-runs at fable)";
    }

    if (dryRun) {
      const worker = next === "fable" && agent !== "fable-architect"
        ? "opus-worker"
        : agents[next];
      process.stdout.write(
        `last-task: ${task}\n` +
        `agent: ${entry.agent}   model: ${entry.model}\n` +
        `dry-run: would re-run at ${next} via ${worker} · log untouched\n`,
      );
      return;
    }

    fs.mkdirSync(state, { recursive: true });
    fs.writeFileSync(
      path.join(state, "redo-pending.json"),
      JSON.stringify({
        ts: new Date().toISOString(),
        original_model: entry.model,
        original_agent: entry.agent,
        task,
      }, null, 2) + "\n",
    );
    process.stdout.write(
      `last-task: ${task}\n` +
      `agent: ${entry.agent}   model: ${entry.model}\n` +
      `${nextLine}\n`,
    );
  } catch {
    process.stdout.write(none + "\n");
  }
}

main();
