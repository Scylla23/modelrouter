#!/usr/bin/env node

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

async function main() {
  let stdin = "";
  for await (const chunk of process.stdin) stdin += chunk;
  JSON.parse(stdin);

  const home = path.join(os.homedir(), ".router");
  if (fs.existsSync(home)) return;

  const defaults = path.join(__dirname, "..", "defaults");
  const temp = home + ".tmp-" + process.pid;
  try {
    fs.mkdirSync(temp, { recursive: true });
    fs.copyFileSync(
      path.join(defaults, "memory.md"),
      path.join(temp, "memory.md"),
    );
    fs.copyFileSync(
      path.join(defaults, "config.json"),
      path.join(temp, "config.json"),
    );
    fs.renameSync(temp, home);
  } catch {
    fs.rmSync(temp, { recursive: true, force: true });
    return;
  }

  process.stdout.write(JSON.stringify({
    systemMessage: [
      "[router] First run: created ~/.router (memory.md, config.json).",
      "I route every task to the cheapest model that can nail it - and I say so.",
      "Wrong call? /router:redo re-runs it one tier up. I remember every correction.",
      "Watch me learn: /router:stats after a day. Paranoid? /router:audit on.",
    ].join("\n"),
  }));
}

main().catch(() => {
  process.exitCode = 0;
});
