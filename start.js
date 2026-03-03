#!/usr/bin/env node
/**
 * start.js — Railway entry point
 * Runs Next.js web server + cron scheduler in the same process.
 * Railway's start command: node start.js
 */

const { spawn } = require("child_process");
const path = require("path");

const ts = () => new Date().toISOString().replace("T", " ").slice(0, 19);

function launch(name, cmd, args, env = {}) {
  console.log(`[${ts()}] Starting ${name}...`);
  const proc = spawn(cmd, args, {
    stdio: "inherit",
    env: { ...process.env, ...env },
    cwd: __dirname,
  });
  proc.on("exit", (code) => {
    console.log(`[${ts()}] ${name} exited with code ${code}`);
    if (name === "Next.js") process.exit(code ?? 1); // if web server dies, kill everything
  });
  proc.on("error", (err) => {
    console.error(`[${ts()}] ${name} error: ${err.message}`);
    if (name === "Next.js") process.exit(1);
  });
  return proc;
}

// Start Next.js web server
launch("Next.js", "node_modules/.bin/next", ["start", "-p", process.env.PORT || "3000"]);

// Start cron scheduler (slight delay so Next.js binds its port first)
setTimeout(() => {
  launch("Scheduler", "node", [path.join(__dirname, "scripts/run-daily.js")]);
}, 5000);

console.log(`[${ts()}] Both processes started.`);
