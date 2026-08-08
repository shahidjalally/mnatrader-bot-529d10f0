import { createHash, randomBytes } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const databaseUrl = new URL("../public/licenses.csv", import.meta.url);
const [action, suppliedKey, suppliedExpiry = "", ...labelParts] = process.argv.slice(2);

function normalized(key) {
  return key.trim().toUpperCase().replace(/\s+/g, "");
}

function hash(key) {
  return createHash("sha256").update(normalized(key)).digest("hex");
}

function generatedKey() {
  return Array.from({ length: 4 }, () => randomBytes(2).toString("hex").toUpperCase()).join("-");
}

const csv = await readFile(databaseUrl, "utf8");
const lines = csv.trimEnd().split(/\r?\n/);

if (action === "add") {
  const key =
    suppliedKey === "--generate" || !suppliedKey ? generatedKey() : normalized(suppliedKey);
  const expiry = suppliedKey === "--generate" ? suppliedExpiry : suppliedExpiry;
  if (expiry && !/^\d{4}-\d{2}-\d{2}$/.test(expiry)) {
    throw new Error("Expiry must be blank or use YYYY-MM-DD format.");
  }
  if (lines.some((line) => line.startsWith(`${hash(key)},`)))
    throw new Error("License already exists.");
  const label = labelParts.join(" ").replaceAll(",", " ");
  lines.push(`${hash(key)},active,${expiry},${label}`);
  await writeFile(databaseUrl, `${lines.join("\n")}\n`);
  console.log(`Added license: ${key}`);
  console.log("Keep this key private; only its SHA-256 hash was saved.");
} else if (action === "revoke" && suppliedKey) {
  const prefix = `${hash(suppliedKey)},`;
  const index = lines.findIndex((line) => line.startsWith(prefix));
  if (index < 0) throw new Error("License was not found.");
  const columns = lines[index].split(",");
  columns[1] = "revoked";
  lines[index] = columns.join(",");
  await writeFile(databaseUrl, `${lines.join("\n")}\n`);
  console.log("License revoked.");
} else {
  console.error(
    "Usage:\n  npm run license:add -- KEY [YYYY-MM-DD] [label]\n  npm run license:add -- --generate [YYYY-MM-DD] [label]\n  npm run license:revoke -- KEY",
  );
  process.exitCode = 1;
}
