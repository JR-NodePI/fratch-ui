import { defineConfig, build } from "vite";
import dts from "vite-plugin-dts";
import fs from "fs";
import glob from "glob";
import path from "node:path";
import react from "@vitejs/plugin-react-swc";
import type { PluginOptions } from "vite-plugin-dts";

const srcDir = "./src";
const outDir = "./dist";

const buildComponent = (file) => {
  const fileName = path
    .basename(file)
    .slice(0, path.basename(file).indexOf(path.extname(file)));

  const moduleDir = `${outDir}/${path.relative(srcDir, path.dirname(file))}`;

  const dtsOptions = (dts as (ops?: PluginOptions) => any)({
    entryRoot: file,
    outDir,
  });

  return build({
    publicDir: false,
    plugins: [dtsOptions, react()],
    build: {
      outDir: moduleDir,
      emptyOutDir: false,
      minify: false,
      sourcemap: true,
      lib: {
        entry: file,
        fileName,
        formats: ["es", "cjs"],
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          new RegExp("\\./[./\\w]+$"),
        ],
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith(".css")) return `${fileName}.css`;
            return assetInfo.name;
          },
        },
      },
    },
  });
};

const combineCssFiles = () => {
  const cssMainFilesPattern = `${outDir}/assets/*.css`;
  const cssFilesPattern = `${outDir}/components/**/*.css`;
  const cssMainFiles = glob.sync(cssMainFilesPattern);
  const cssFiles = glob.sync(cssFilesPattern, {
    ignore: cssMainFilesPattern,
  });
  const cssImports = [...cssMainFiles, ...cssFiles].map(
    (file) => `@import url(./${path.relative(outDir, file)});`
  );
  fs.writeFileSync(`${outDir}/styles.css`, cssImports.join("\n"), "utf-8");
};

const buildComponentsOnCloseBundle = () => ({
  name: "buildComponentsOnCloseBundle",
  async closeBundle() {
    const componentFiles = glob.sync(`${srcDir}/**/*.{tsx,ts}`, {
      ignore: `${srcDir}/**/*.{stories,d}.{tsx,ts}`,
    });
    await Promise.allSettled(componentFiles.map(buildComponent));
    combineCssFiles();
  },
});

export default defineConfig({
  plugins: [buildComponentsOnCloseBundle()],
  build: {
    outDir,
    emptyOutDir: false,
    minify: false,
    sourcemap: true,
    rollupOptions: {
      input: "src/styles/styles.css",
    },
  },
});
