#!/usr/bin/env node

const { ADVISORS, ask } = require("./advisors");

const argv = process.argv.slice(2);
const question = argv.find((arg) => !arg.startsWith("--"));
const rolesArg = argv.find((arg) => arg.startsWith("--roles="));
const roles = rolesArg
  ? rolesArg.slice(8).split(",").map((role) => role.trim()).filter(Boolean)
  : ["researcher", "strategist", "seo", "commerce", "critic"];

if (!question) {
  console.error('Usage: node hive/council.js "<question>" [--roles=researcher,strategist,...]');
  console.error(`Available: ${Object.keys(ADVISORS).join(", ")}`);
  process.exit(1);
}

(async () => {
  console.log(`COUNCIL CONVENED on: "${question}"\n`);
  console.log(`Advisors: ${roles.join(", ")}\n`);
  console.log("─".repeat(72));

  const results = await Promise.allSettled(roles.map((role) => ask(role, question)));
  const successful = [];

  for (let index = 0; index < roles.length; index += 1) {
    const role = roles[index];
    const result = results[index];
    if (result.status === "fulfilled") {
      const advisor = result.value;
      console.log(`\n═══ ${advisor.title} [${advisor.backend}] ═══\n`);
      console.log(advisor.response);
      console.log("\n" + "─".repeat(72));
      successful.push(advisor);
      continue;
    }

    console.log(`\n═══ ${role} ═══\n`);
    console.log(`(failed: ${result.reason.message})`);
    console.log("\n" + "─".repeat(72));
  }

  if (successful.length < 2) {
    console.log("\n(not enough advisors succeeded for synthesis)");
    return;
  }

  const synthesis = successful.map((entry) => `[${entry.title}]\n${entry.response}`).join("\n\n───\n\n");
  const judgeQuestion = `Original question: "${question}"\n\nAdvisor inputs:\n\n${synthesis}\n\nBased on the above, rank the next 5 moves by ROI. Include: action, hours, expected dollar/traffic impact, cost, dependencies.`;

  try {
    const judgment = await ask("judge", judgeQuestion);
    console.log(`\n═══ ${judgment.title} — FINAL RANKING [${judgment.backend}] ═══\n`);
    console.log(judgment.response);
  } catch (error) {
    console.log(`\nJudge failed: ${error.message}`);
  }
})();
