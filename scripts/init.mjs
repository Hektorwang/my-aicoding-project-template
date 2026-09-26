import { execSync } from "node:child_process";
import { existsSync, copyFileSync } from "node:fs";

const agent = process.argv[2] || "claude-code";

console.log(`Installing grill workflow skills for agent: ${agent}...`);
execSync(`npx skills add mattpocock/skills --skill grill-with-docs --skill grilling --skill domain-modeling --skill ask-matt --skill to-prd --skill to-issues --skill implement --skill code-review --agent ${agent} -y`, { stdio: "inherit" });

console.log("Generating CLAUDE.md...");
if (!existsSync("CLAUDE.md")) {
  copyFileSync("CLAUDE.md.template", "CLAUDE.md");
  console.log("CLAUDE.md created. Please edit it with your project background and requirements.");
}

console.log("Done. Next steps:");
console.log("  1) Edit CLAUDE.md");
console.log("  2) Run grill inside your agent");