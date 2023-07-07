import { defineConfig, build } from "vite";
import dts from "vite-plugin-dts";
import fs from "fs";
import glob from "glob";
import path from "node:path";
import react from "@vitejs/plugin-react-swc";
import type { PluginOptions } from "vite-plugin-dts";

const srcDir = "src";
const outDir = "dist";
const srcComponentsDir = srcDir + "/components";
const outComponentsDir = outDir + "/components";

const buildComponent = (file) => {
  const fileName = path.relative(
    srcComponentsDir,
    file.slice(0, file.indexOf(path.extname(file)))
  );

  return build({
    publicDir: false,
    plugins: [(dts as (options?: PluginOptions) => any)({ outDir }), react()],
    build: {
      outDir: outComponentsDir,
      emptyOutDir: false,
      minify: false,
      sourcemap: true,
      lib: {
        entry: file,
        fileName,
        formats: ["es", "cjs"],
      },
      rollupOptions: {
        external: ["react", "react-dom", "react/jsx-runtime"],
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
  const cssFilesPattern = `${outComponentsDir}/**/*.css`;
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
  name: "buildOnCloseBundle",
  async closeBundle() {
    const componentFiles = glob.sync(`${srcComponentsDir}/**/*.tsx`);
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
