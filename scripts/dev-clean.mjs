import { rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const nextDir = join(process.cwd(), ".next");

try {
  rmSync(nextDir, { recursive: true, force: true });
  console.log("Đã xóa cache .next");
} catch {
  // ignore
}

const devScript = join(__dirname, "dev.mjs");
const result = spawnSync(process.execPath, [devScript], { stdio: "inherit" });

process.exit(result.status ?? 1);
