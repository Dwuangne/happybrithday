import { spawn, execSync } from "node:child_process";
import { platform } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PORT = Number(process.env.PORT || 3000);
const __dirname = dirname(fileURLToPath(import.meta.url));
const freePortScript = join(__dirname, "free-port.mjs");

function freePort() {
  execSync(`node "${freePortScript}" ${PORT}`, { stdio: "inherit" });
}

function spawnNextDev() {
  const nextCli = join(process.cwd(), "node_modules", "next", "dist", "bin", "next");

  return spawn(process.execPath, [nextCli, "dev", "-p", String(PORT)], {
    stdio: "inherit",
    env: { ...process.env, PORT: String(PORT) },
    windowsHide: false,
  });
}

freePort();

console.log(`\n▶ Next.js dev → http://localhost:${PORT}\n`);

const child = spawnNextDev();
let stopping = false;

function cleanup() {
  if (stopping) return;
  stopping = true;

  console.log(`\nĐang dừng server và giải phóng port ${PORT}...`);

  if (child.pid) {
    try {
      if (platform() === "win32") {
        execSync(`taskkill /PID ${child.pid} /T /F`, {
          stdio: "ignore",
          windowsHide: true,
        });
      } else {
        child.kill("SIGTERM");
      }
    } catch {
      // Process có thể đã tắt
    }
  }

  setTimeout(() => {
    try {
      freePort();
    } catch {
      // Bỏ qua nếu port đã trống
    }
    process.exit(0);
  }, 400);
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

child.on("exit", (code, signal) => {
  if (stopping) return;

  if (signal !== "SIGINT" && signal !== "SIGTERM") {
    try {
      freePort();
    } catch {
      // ignore
    }
  }

  process.exit(code ?? 0);
});
