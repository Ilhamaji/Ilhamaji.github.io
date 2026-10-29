import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**", "out/**"],
  },
  resolve: {
    alias: {
      // `import.meta.dirname` rather than `__dirname`: Vite's native config
      // loader warns that __dirname is unsupported and is slated to become the
      // default loader in the next major.
      "@": path.resolve(import.meta.dirname, "."),
    },
  },
});
