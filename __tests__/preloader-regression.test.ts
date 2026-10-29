import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const root = path.resolve(__dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");

/**
 * Regression guard for the preloader deadlock.
 *
 * The site shipped with a preloader that reached 100% and never unmounted,
 * because root-provider passed an inline arrow into a useEffect dependency
 * array. Visitors saw a permanent loading screen and zero content.
 *
 * The fix is removal. These tests assert the preloader cannot come back
 * without a guard that proves it terminates.
 */
describe("preloader deadlock (regression)", () => {
  it("does not render a blocking preloader", () => {
    expect(existsSync(path.join(root, "components/preloader.tsx"))).toBe(false);
  });

  it("root layout renders children directly with no loader gate", () => {
    const layout = read("app/layout.tsx");
    expect(layout).not.toMatch(/Preloader/);
    expect(layout).not.toMatch(/RootProvider/);
    expect(layout).toMatch(/\{children\}/);
  });

  it("does not gate the page behind a loading state", () => {
    const layout = read("app/layout.tsx");
    expect(layout).not.toMatch(/useState\(\s*true\s*\)/);
    expect(layout).not.toMatch(/loading/);
  });
});
