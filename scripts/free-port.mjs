import { execSync } from "node:child_process";
import { platform } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const port = Number(process.argv[2] || process.env.PORT || 3000);

if (!Number.isFinite(port) || port < 1 || port > 65535) {
  console.error("Port không hợp lệ:", process.argv[2]);
  process.exit(1);
}

function killPid(pid) {
  if (!pid || pid === "0" || !/^\d+$/.test(pid)) return false;

  try {
    if (platform() === "win32") {
      execSync(`taskkill /PID ${pid} /T /F`, { stdio: "ignore", windowsHide: true });
    } else {
      execSync(`kill -9 ${pid}`, { stdio: "ignore" });
    }
    return true;
  } catch {
    return false;
  }
}

function freePortWindows(targetPort) {
  const pids = new Set();

  try {
    const output = execSync(`netstat -ano | findstr ":${targetPort}"`, {
      encoding: "utf8",
      windowsHide: true,
    });

    for (const line of output.split(/\r?\n/)) {
      if (!line.includes("LISTENING")) continue;
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid) pids.add(pid);
    }
  } catch {
    // Không có process nào chiếm port
  }

  let freed = 0;
  for (const pid of pids) {
    if (killPid(pid)) {
      freed += 1;
      console.log(`Đã giải phóng port ${targetPort} (PID ${pid})`);
    }
  }

  return freed;
}

function freePortUnix(targetPort) {
  let freed = 0;

  try {
    const output = execSync(`lsof -ti :${targetPort}`, { encoding: "utf8" });
    for (const pid of output.trim().split(/\s+/)) {
      if (killPid(pid)) {
        freed += 1;
        console.log(`Đã giải phóng port ${targetPort} (PID ${pid})`);
      }
    }
  } catch {
    // Port đang trống
  }

  return freed;
}

function killOrphanNextOnWindows() {
  const projectName = process.cwd().split(/[/\\]/).pop() || "Birthday-TH";
  const psScript = join(dirname(fileURLToPath(import.meta.url)), "kill-orphans.ps1");

  try {
    const output = execSync(
      `powershell -NoProfile -ExecutionPolicy Bypass -File "${psScript}" -ProjectName "${projectName}"`,
      { encoding: "utf8", windowsHide: true }
    );

    for (const pid of output.trim().split(/\r?\n/)) {
      const id = pid.trim();
      if (id) {
        console.log(`Đã dừng Next.js còn sót (PID ${id})`);
      }
    }
  } catch {
    // Không còn process sót
  }
}

if (platform() === "win32") {
  killOrphanNextOnWindows();
}

const freed = platform() === "win32" ? freePortWindows(port) : freePortUnix(port);

if (freed === 0) {
  console.log(`Port ${port} đang trống.`);
}
