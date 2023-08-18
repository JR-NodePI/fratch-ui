import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import glob from 'glob';
import path from 'node:path';
import { build, defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const srcDir = './src';
const outDir = './dist';

const excludes = [
  './**/*.{stories,test,d}.{tsx,ts}',
  './**/__tests__*',
  './**/__stories__*',
  './**/__mocks__*',
];

const buildComponent = file => {
  const fileName = path
    .basename(file)
    .slice(0, path.basename(file).indexOf(path.extname(file)));

  const moduleOutDir = `${outDir}/${path.relative(srcDir, path.dirname(file))}`;

  return build({
    publicDir: false,
    plugins: [react()],
    build: {
      outDir: moduleOutDir,
      emptyOutDir: false,
      minify: false,
      sourcemap: true,
      lib: {
        entry: file,
        fileName,
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: [
          'lodash',
          'react',
          'react-dom',
          'react/jsx-runtime',
          new RegExp('\\./[./\\w]+$'),
        ],
        output: {
          assetFileNames: assetInfo => {
            if (assetInfo.name.endsWith('.css')) return `${fileName}.css`;
            return assetInfo.name;
          },
        },
      },
    },
  });
};

const combineCssFiles = () => {
  const cssMainFilesPattern = `${outDir}/*_styles.css`;
  const cssFilesPattern = `${outDir}/components/**/*.css`;
  const cssMainFiles = glob.sync(cssMainFilesPattern);
  const cssFiles = glob.sync(cssFilesPattern, {
    ignore: cssMainFilesPattern,
  });
  const cssImports = [...cssMainFiles, ...cssFiles].map(
    file =>
      `@import url(./${path.relative(outDir, file).replace(/\\/gi, '/')});`
  );
  fs.writeFileSync(`${outDir}/styles.css`, cssImports.join('\n'), 'utf-8');
};

const buildComponentsOnCloseBundle = () => ({
  name: 'buildComponentsOnCloseBundle',
  async closeBundle() {
    const componentFiles = glob.sync(`${srcDir}/**/*.{tsx,ts}`, {
      ignore: excludes,
    });
    await Promise.allSettled(componentFiles.map(buildComponent));
    combineCssFiles();
  },
});

const copyDtsTypeFiles = () => {
  const dTsFiles = glob.sync(`${srcDir}/**/*.d.ts`, {
    ignore: ['./**/env.d.ts'],
  });
  dTsFiles.forEach(file => {
    fs.copyFileSync(file, `${outDir}/${path.relative(srcDir, file)}`);
  });
};

export default defineConfig({
  plugins: [
    buildComponentsOnCloseBundle(),
    dts({
      outDir,
      exclude: excludes,
      entryRoot: srcDir,
      afterBuild: () => {
        copyDtsTypeFiles();
      },
    }),
  ],
  build: {
    outDir,
    emptyOutDir: false,
    minify: false,
    sourcemap: false,
    rollupOptions: {
      input: 'src/styles/styles.css',
      output: {
        assetFileNames: assetInfo => {
          if (assetInfo.name.endsWith('.css')) {
            return `[hash]_${assetInfo.name}`;
          } else if (assetInfo.name.endsWith('.woff2')) {
            return `@fratch-ui-fonts/${assetInfo.name}`;
          } else {
            return `assets/${assetInfo.name}`;
          }
        },
      },
    },
  },
});
