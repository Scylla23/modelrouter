#!/usr/bin/env node

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const ERROR = "[router] could not render PNG";
const SKIP = "[router] no Chrome/Chromium found - PNG skipped (card printed above)";

function chromePath() {
  if (process.env.ROUTER_CHROME !== undefined) {
    return fs.existsSync(process.env.ROUTER_CHROME)
      ? process.env.ROUTER_CHROME : null;
  }
  const applications = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
  ];
  for (const candidate of applications) {
    if (fs.existsSync(candidate)) return candidate;
  }
  for (const name of ["google-chrome", "chromium", "chromium-browser"]) {
    for (const directory of (process.env.PATH || "").split(path.delimiter)) {
      const candidate = path.join(directory, name);
      if (fs.existsSync(candidate)) return candidate;
    }
  }
  return null;
}

function main() {
  const card = fs.readFileSync(0, "utf8");
  if (!card) return console.log(ERROR);

  let template;
  try {
    template = fs.readFileSync(
      path.join(__dirname, "..", "templates", "card.html"),
      "utf8",
    );
  } catch {
    return console.log(ERROR);
  }

  const chrome = chromePath();
  if (!chrome) return console.log(SKIP);

  const html = template.replace(
    "{{CARD}}",
    card.replaceAll("&", "&amp;").replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;"),
  );
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "router-png-"));
  try {
    const htmlFile = path.join(temp, "card.html");
    fs.writeFileSync(htmlFile, html);
    if (process.env.ROUTER_PNG_HTML) {
      fs.writeFileSync(process.env.ROUTER_PNG_HTML, html);
    }

    const output = path.join(process.cwd(), ".router", "stats-card.png");
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.rmSync(output, { force: true });
    spawnSync(chrome, [
      "--headless",
      "--disable-gpu",
      "--force-device-scale-factor=2",
      `--window-size=760,${90 + 22 * card.split("\n").length}`,
      `--screenshot=${output}`,
      `file://${htmlFile}`,
    ]);
    try {
      if (fs.statSync(output).size > 0) {
        return console.log("stats card PNG written to .router/stats-card.png");
      }
    } catch {}
    console.log(ERROR);
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
}

try {
  main();
} catch {
  console.log(ERROR);
}
