import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import glob from 'glob';
import path from 'node:path';
import { build, defineConfig, PluginOption } from 'vite';
import dts from 'vite-plugin-dts';

const srcDir = './src';
const outDir = './dist';
const fontsDir = 'fonts';
const stylesDir = 'styles';
const assetsDir = 'assets';
const componentsDir = 'components';
const stylesFileName = 'styles.css';

const excludes = [
  './**/*.{stories,test,d}.{tsx,ts}',
  './**/__tests__*',
  './**/__stories__*',
  './**/__mocks__*',
];

const buildComponent = (file): ReturnType<typeof build> => {
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

const combineCssFiles = (): void => {
  const cssMainFilesPattern = `${outDir}/${stylesDir}/*_${stylesFileName}`;
  const cssFilesPattern = `${outDir}/${componentsDir}/**/*.css`;
  const cssMainFiles = glob.sync(cssMainFilesPattern);
  const cssFiles = glob.sync(cssFilesPattern, {
    ignore: cssMainFilesPattern,
  });
  const currentContents = fs
    .readFileSync(`${outDir}/${stylesDir}/${stylesFileName}`, 'utf-8')
    .replace(
      new RegExp(`(url\\()(.*)${fontsDir}/`, 'g'),
      `$1${path.relative(
        `${outDir}/${stylesDir}/`,
        path.resolve(`${outDir}/${fontsDir}/`)
      )}`
    );

  const cssImports = [...cssMainFiles, ...cssFiles].map(
    file =>
      `@import url(${path
        .relative(`${outDir}/${stylesDir}`, file)
        .replace(/\\/gi, '/')});`
  );
  fs.writeFileSync(
    `${outDir}/${stylesDir}/${stylesFileName}`,
    `${currentContents}\n${cssImports.join('\n')}`,
    'utf-8'
  );
};

const buildComponentsOnCloseBundle = (): PluginOption => ({
  name: 'buildComponentsOnCloseBundle',
  async closeBundle(): Promise<void> {
    const componentFiles = glob.sync(`${srcDir}/**/*.{tsx,ts}`, {
      ignore: excludes,
    });
    await Promise.allSettled(componentFiles.map(buildComponent));
    combineCssFiles();
  },
});

const copyDtsTypeFiles = (): void => {
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
      input: `${srcDir}/${stylesDir}/${stylesFileName}`,
      output: {
        assetFileNames: assetInfo => {
          if (/\.(css)$/.test(assetInfo.name)) {
            return `${stylesDir}/${stylesFileName}`;
          } else if (/\.(woff|woff2|eot|ttf)$/.test(assetInfo.name)) {
            return `${fontsDir}/${assetInfo.name}`;
          } else {
            return `${assetsDir}/${assetInfo.name}`;
          }
        },
      },
    },
  },
});
