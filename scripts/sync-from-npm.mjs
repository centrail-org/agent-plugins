#!/usr/bin/env node
// Brings plugins/centrail up to the `centrail` package npm tags `latest`.
// The plugin's bundle is the CLI's published dist/index.js, byte for byte, so
// this repo is built only from the verified npm artifact: no source lives here
// and no credential reaches the CLI's repository. Prints the new version, or
// nothing when the plugin is current. Usage: node scripts/sync-from-npm.mjs
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const PACKAGE = "centrail";
const root = new URL("..", import.meta.url).pathname;
const plugin = join(root, "plugins/centrail");
const manifests = [".claude-plugin/plugin.json", ".codex-plugin/plugin.json"].map((p) => join(plugin, p));
const marketplace = join(root, ".claude-plugin/marketplace.json");

const npm = (...args) => execFileSync("npm", args, { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }).trim();
const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const writeJson = (path, value) => writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);

// Stable x.y.z only: prereleases are published under npm's `next` tag.
const parse = (v) => (/^(\d+)\.(\d+)\.(\d+)$/.exec(v) ?? []).slice(1).map(Number);
function newer(a, b) {
  const [x, y] = [parse(a), parse(b)];
  if (x.length !== 3) throw new Error(`npm latest is not a stable version: ${a}`);
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] > (y[i] ?? -1);
  return false;
}

const current = readJson(manifests[0]).version;
const { version, "dist.integrity": integrity } = JSON.parse(npm("view", `${PACKAGE}@latest`, "version", "dist.integrity", "--json"));
if (!newer(version, current)) process.exit(0);

const work = mkdtempSync(join(tmpdir(), "centrail-plugin-"));
try {
  const file = join(work, npm("pack", `${PACKAGE}@${version}`, "--pack-destination", work, "--silent").split("\n").pop());
  const digest = `sha512-${createHash("sha512").update(readFileSync(file)).digest("base64")}`;
  if (digest !== integrity) throw new Error(`${PACKAGE}@${version}: tarball integrity ${digest} does not match npm's ${integrity}`);
  execFileSync("tar", ["xzf", file, "-C", work]);
  const pkg = join(work, "package");
  // From the release that ships them, the plugin's own files come from the package too.
  if (existsSync(join(pkg, "plugin"))) cpSync(join(pkg, "plugin"), plugin, { recursive: true });
  cpSync(join(pkg, "dist/index.js"), join(plugin, "scripts/centrail.mjs"));
  // The release's licence governs what this repository serves: from the release
  // that ships one, the package's agreement replaces the earlier Apache-2.0 text.
  if (existsSync(join(pkg, "LICENSE.md"))) {
    cpSync(join(pkg, "LICENSE.md"), join(root, "LICENSE.md"));
    rmSync(join(root, "LICENSE"), { force: true });
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
for (const path of manifests) writeJson(path, { ...readJson(path), version });
const m = readJson(marketplace);
writeJson(marketplace, { ...m, metadata: { ...m.metadata, version } });
console.log(version);
