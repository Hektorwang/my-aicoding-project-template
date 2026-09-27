import { execSync } from "node:child_process";
import { existsSync, copyFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Anchor the working directory to the repository root (parent of scripts/),
// so the script works regardless of where it is invoked from.
const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
process.chdir(repoRoot);

// Node.js version check: LTS (>= 18) required.
const nodeMajor = Number(process.versions.node.split(".")[0]);
if (nodeMajor < 18) {
  console.error(`Node.js >= 18 is required, current version: ${process.version}`);
  process.exit(1);
}

console.log("Starting skill installation. Follow the prompts to choose skills and target agent.");
try {
  execSync("npx skills add mattpocock/skills", { stdio: "inherit" });
} catch {
  console.error("Skill installation failed. Check your network and npm registry, then re-run: node scripts/init.mjs");
  process.exit(1);
}

console.log("Generating CLAUDE.md...");
if (!existsSync("CLAUDE.md")) {
  copyFileSync("CLAUDE.md.template", "CLAUDE.md");
  console.log("CLAUDE.md created. Please edit it with your project background and requirements.");
} else {
  console.log("CLAUDE.md already exists, skipping.");
}

console.log("Generating pyproject.toml...");
if (!existsSync("pyproject.toml")) {
  copyFileSync("pyproject.toml.template", "pyproject.toml");
  console.log("pyproject.toml created. Please edit the fields marked with TODO.");
} else {
  console.log("pyproject.toml already exists, skipping.");
}

console.log("Generating release-note.md...");
if (!existsSync("release-note.md")) {
  copyFileSync("release-note.md.template", "release-note.md");
  console.log("release-note.md created. Keep its third line in sync with the pyproject.toml version.");
  console.log("(Chinese version available: copy release-note-zh_CN.md.template instead if preferred.)");
} else {
  console.log("release-note.md already exists, skipping.");
}

console.log("Done. Next steps:");
console.log("  1) Edit CLAUDE.md");
console.log("  2) Edit pyproject.toml (name, version, description, authors, package paths)");
console.log("  3) Run grill inside your agent");
