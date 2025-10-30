import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const sourcePath = path.join(
  projectRoot,
  "src",
  "data",
  "dashboard-metrics.mock.json"
);
const targetDir = path.join(
  projectRoot,
  "src",
  "templates",
  "includes",
  "dashboard"
);
const targetPath = path.join(targetDir, "dashboard-data.json.liquid");

async function syncDashboardData() {
  try {
    const [rawJson] = await Promise.all([readFile(sourcePath, "utf-8")]);

    await mkdir(targetDir, { recursive: true });

    const banner =
      "{%- comment -%}\n" +
      "  Auto-generated from src/data/dashboard-metrics.mock.json. Do not edit directly.\n" +
      "  Regenerate via `npm run sync:dashboard-data` when the mock changes.\n" +
      "{%- endcomment -%}\n";

    await writeFile(targetPath, `${banner}${rawJson.trim()}\n`, "utf-8");
    console.log(`✅ Synced dashboard mock into ${path.relative(projectRoot, targetPath)}`);
  } catch (error) {
    console.error("❌ Failed to sync dashboard mock:", error.message);
    process.exitCode = 1;
  }
}

await syncDashboardData();
