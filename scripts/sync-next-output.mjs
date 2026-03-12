import fs from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, "web", ".next");
const targetDir = path.join(rootDir, ".next");

async function exists(dir) {
  try {
    await fs.access(dir);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await exists(sourceDir))) {
    throw new Error(`Expected Next output at ${sourceDir}`);
  }

  await fs.rm(targetDir, { recursive: true, force: true });
  await fs.cp(sourceDir, targetDir, { recursive: true });

  console.log(`Synced ${sourceDir} -> ${targetDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
