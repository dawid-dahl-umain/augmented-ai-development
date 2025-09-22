import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/prompts/index.ts", "src/rules/index.ts"],
  format: ["esm", "cjs"],
  dts: false,
  sourcemap: true,
  clean: true,
  target: "es2022",
  treeshake: true,
  loader: {
    ".md": "text",
    ".mdc": "text",
  },
});
