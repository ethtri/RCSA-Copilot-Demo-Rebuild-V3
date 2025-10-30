import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Map schemas to the mocks they govern so sprint agents can add new pairs in one place.
const contractPairs = [
  {
    label: "ROI calculator",
    schemaPath: "docs/data-contracts/roi.schema.json",
    dataPath: "src/data/roi-calculator.mock.json"
  },
  {
    label: "Dashboard metrics",
    schemaPath: "docs/data-contracts/dashboard.schema.json",
    dataPath: "src/data/dashboard-metrics.mock.json"
  },
  {
    label: "Wizard insights",
    schemaPath: "docs/data-contracts/wizard.schema.json",
    dataPath: "src/data/wizard-insights.mock.json"
  }
];

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

const failures = [];

for (const { label, schemaPath, dataPath } of contractPairs) {
  const resolvedSchemaPath = path.join(projectRoot, schemaPath);
  const resolvedDataPath = path.join(projectRoot, dataPath);

  try {
    const [schemaRaw, dataRaw] = await Promise.all([
      readFile(resolvedSchemaPath, "utf-8"),
      readFile(resolvedDataPath, "utf-8")
    ]);

    const schema = JSON.parse(schemaRaw);
    const data = JSON.parse(dataRaw);

    const validate = ajv.compile(schema);
    const isValid = validate(data);

    if (isValid) {
      console.log(`✅ ${label} mock matches ${schemaPath}`);
    } else {
      failures.push({
        label,
        schemaPath,
        dataPath,
        errors: validate.errors ?? []
      });
    }
  } catch (error) {
    failures.push({
      label,
      schemaPath,
      dataPath,
      errors: [{ message: error.message }]
    });
  }
}

if (failures.length > 0) {
  console.error("\nData contract validation failed.");
  for (const failure of failures) {
    console.error(`\n• ${failure.label} (${failure.dataPath})`);
    for (const err of failure.errors) {
      const { instancePath = "", message = "Unknown error" } = err;
      console.error(`  - ${instancePath || "<root>"}: ${message}`);
    }
  }
  process.exit(1);
}

console.log("\nAll data contracts validated successfully.");
