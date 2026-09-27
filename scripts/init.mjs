import { execSync } from "node:child_process";
import { existsSync, copyFileSync } from "node:fs";

console.log("Starting skill installation. Follow the prompts to choose skills and target agent.");
execSync("npx skills add mattpocock/skills", { stdio: "inherit" });

console.log("Generating CLAUDE.md...");
if (!existsSync("CLAUDE.md")) {
  copyFileSync("CLAUDE.md.template", "CLAUDE.md");
  console.log("CLAUDE.md created. Please edit it with your project background and requirements.");
}

console.log("Done. Next steps:");
console.log("  1) Edit CLAUDE.md");
console.log("  2) Run grill inside your agent");