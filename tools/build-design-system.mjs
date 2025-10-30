import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as sass from "sass";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const tokensDir = path.join(projectRoot, "design-system", "tokens");
const srcDir = path.join(projectRoot, "design-system", "src");
const distDir = path.join(projectRoot, "design-system", "dist");
const generatedPartialPath = path.join(srcDir, "_tokens.generated.scss");

const indent = (level) => "  ".repeat(Math.max(level, 0));

const isUnquotedLiteral = (value) =>
  /^#[0-9a-fA-F]{3,8}$/.test(value) ||
  /^[0-9.]+(rem|px|%)$/.test(value) ||
  /^[0-9.]+$/.test(value) ||
  /^[a-zA-Z-]+\(.*\)$/.test(value);

const formatValue = (value) => {
  if (typeof value === "number") {
    return value.toString();
  }

  if (typeof value !== "string") {
    return value;
  }

  const startsWithQuote = value.startsWith("'") || value.startsWith('"');
  const containsComma = value.includes(",");

  if (startsWithQuote && !containsComma) {
    return value;
  }

  if (isUnquotedLiteral(value)) {
    return value;
  }

  return `'${value.replace(/'/g, "\\'")}'`;
};

const toScssMap = (input, depth = 1) => {
  if (Array.isArray(input)) {
    const items = input
      .map((value) => `${indent(depth)}${formatValue(value)}`)
      .join(",\n");
    return `(\n${items}\n${indent(depth - 1)})`;
  }

  if (input && typeof input === "object") {
    const entries = Object.entries(input).map(
      ([key, value]) =>
        `${indent(depth)}${key}: ${toScssMap(value, depth + 1)}`
    );
    return `(\n${entries.join(",\n")}\n${indent(depth - 1)})`;
  }

  return formatValue(input);
};

async function loadTokenFiles() {
  const files = (await fs.readdir(tokensDir))
    .filter((file) => file.endsWith(".json"))
    .sort();

  const tokenMaps = await Promise.all(
    files.map(async (file) => {
      const tokenName = path.basename(file, ".json");
      const filePath = path.join(tokensDir, file);
      const content = await fs.readFile(filePath, "utf8");
      return {
        tokenName,
        data: JSON.parse(content)
      };
    })
  );

  return tokenMaps;
}

async function writeGeneratedPartial(tokenMaps) {
  const sections = [
    "// AUTO-GENERATED FILE. Run `npm run build:design-system` to regenerate.",
    "// Source of truth lives under design-system/tokens/*.json.\n"
  ];

  tokenMaps.forEach(({ tokenName, data }) => {
    const variableName = `$${tokenName}-tokens`;
    sections.push(`${variableName}: ${toScssMap(data)};`, "");
  });

  await fs.mkdir(srcDir, { recursive: true });
  await fs.writeFile(generatedPartialPath, sections.join("\n"), "utf8");
}

async function compileScss(entryFile, outFile) {
  const result = sass.compile(entryFile, {
    style: "expanded",
    loadPaths: [srcDir]
  });

  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, result.css, "utf8");
  const relativePath = path.relative(projectRoot, outFile);
  console.log(`✓ ${relativePath}`);
}

async function main() {
  const tokenMaps = await loadTokenFiles();
  if (!tokenMaps.length) {
    throw new Error("No token JSON files found. Aborting build.");
  }

  await writeGeneratedPartial(tokenMaps);

  await fs.mkdir(distDir, { recursive: true });

  const builds = [
    {
      entry: path.join(srcDir, "tokens.scss"),
      outFile: path.join(distDir, "rcsa-tokens.css")
    },
    {
      entry: path.join(srcDir, "utilities.scss"),
      outFile: path.join(distDir, "rcsa-utilities.css")
    }
  ];

  for (const build of builds) {
    await compileScss(build.entry, build.outFile);
  }

  console.log("Design system build completed.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
