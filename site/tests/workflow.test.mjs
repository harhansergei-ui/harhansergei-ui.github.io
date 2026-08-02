import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workflow = await readFile(
  path.join(siteRoot, "..", ".github", "workflows", "pages.yml"),
  "utf8",
);

test("GitHub Pages runs quality gates before the static deployment build", () => {
  const install = workflow.indexOf("npm ci");
  const lint = workflow.indexOf("npm run lint");
  const tests = workflow.indexOf("npm test");
  const build = workflow.indexOf("npm run build:static");

  assert.ok(install >= 0, "workflow should install dependencies");
  assert.ok(lint > install, "lint should run after dependency installation");
  assert.ok(tests > lint, "tests should run after lint");
  assert.ok(build > tests, "static build should run only after tests pass");
});
