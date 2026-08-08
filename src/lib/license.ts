const LICENSE_STORAGE_KEY = "mna-trader-license";

export type LicenseResult =
  { valid: true; key: string; expiresAt: string | null } | { valid: false; reason: string };

type LicenseRecord = {
  keyHash: string;
  status: string;
  expiresAt: string;
};

function normalizeKey(key: string) {
  return key.trim().toUpperCase().replace(/\s+/g, "");
}

async function hashKey(key: string) {
  const bytes = new TextEncoder().encode(normalizeKey(key));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function parseLicenseCsv(csv: string): LicenseRecord[] {
  return csv
    .split(/\r?\n/)
    .slice(1)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const [keyHash = "", status = "", expiresAt = ""] = line.split(",");
      return {
        keyHash: keyHash.trim().toLowerCase(),
        status: status.trim().toLowerCase(),
        expiresAt: expiresAt.trim(),
      };
    });
}

export async function validateLicense(key: string): Promise<LicenseResult> {
  const normalizedKey = normalizeKey(key);
  if (!normalizedKey) return { valid: false, reason: "Enter your license key." };

  try {
    const response = await fetch(`${import.meta.env.BASE_URL}licenses.csv`, { cache: "no-store" });
    if (!response.ok) throw new Error(`License database returned ${response.status}`);

    const keyHash = await hashKey(normalizedKey);
    const record = parseLicenseCsv(await response.text()).find((item) => item.keyHash === keyHash);
    if (!record) return { valid: false, reason: "This license key was not found." };
    if (record.status !== "active") {
      return { valid: false, reason: "This license is inactive or has been revoked." };
    }

    if (record.expiresAt) {
      const expiresAt = new Date(`${record.expiresAt}T23:59:59.999Z`);
      if (Number.isNaN(expiresAt.getTime()) || expiresAt.getTime() < Date.now()) {
        return { valid: false, reason: "This license has expired." };
      }
    }

    localStorage.setItem(LICENSE_STORAGE_KEY, normalizedKey);
    return { valid: true, key: normalizedKey, expiresAt: record.expiresAt || null };
  } catch {
    return {
      valid: false,
      reason: "The license database could not be reached. Check your connection and try again.",
    };
  }
}

export async function validateStoredLicense() {
  const key = localStorage.getItem(LICENSE_STORAGE_KEY);
  return key ? validateLicense(key) : Promise.resolve<LicenseResult>({ valid: false, reason: "" });
}

export function clearStoredLicense() {
  localStorage.removeItem(LICENSE_STORAGE_KEY);
}
