import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import glob from 'glob';
import path from 'node:path';
import { build, defineConfig, PluginOption } from 'vite';
import dts from 'vite-plugin-dts';

const srcDir = './src';
const outDir = './dist';
const stylesDirName = 'styles';
const assetsDirName = 'assets';
const stylesFileName = 'styles.css';

const excludes = [
  './**/*.{stories,test,d}.{tsx,ts}',
  './**/__tests__/*.*',
  './**/__mocks__/*.*',
  './**/__stories__/*.*',
];
const external = [
  'lodash',
  'react',
  'react-dom',
  'react/jsx-runtime',
  // all local imports except image and css file formats
  new RegExp('(?!.*\\.(png|jpg|jpeg|gif|svg|webp|css)$)(\\./[./\\w]+)$'),
];

const assetFileNames = (assetInfo): string => {
  if (/\.(css)$/.test(assetInfo.name)) {
    return `[hash]_${stylesFileName}`;
  } else {
    return `${assetsDirName}/[hash]_${assetInfo.name}`;
  }
};

const buildComponent = (file): ReturnType<typeof build> => {
  const fileName = path
    .basename(file)
    .slice(0, path.basename(file).indexOf(path.extname(file)));

  const moduleOutDir = `${outDir}/${path.relative(srcDir, path.dirname(file))}`;

  return build({
    publicDir: false,
    plugins: [react()],
    build: {
      assetsDir: `${outDir}/${assetsDirName}`,
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
        external: external,
        output: { assetFileNames },
      },
    },
  });
};

const combineCssFiles = (): void => {
  const cssFiles = glob
    .sync(`${outDir}/**/*.css`)
    .sort((a, b) => (a.split('/').length > b.split('/').length ? 1 : -1));

  const cssContents = cssFiles.map(file => {
    const content = fs
      .readFileSync(path.resolve(file), 'utf-8')
      .replace(
        new RegExp(`(url\\().*${assetsDirName}/`, 'g'),
        `$1${path.relative(
          `${outDir}/${stylesDirName}/`,
          `${outDir}/${assetsDirName}/`
        )}/`
      );

    fs.unlinkSync(file);

    return `\n/*****--- ${file} ---*****/\n${content}`;
  });

  fs.mkdirSync(`${outDir}/${stylesDirName}`, { recursive: true });
  fs.writeFileSync(
    `${outDir}/${stylesDirName}/${stylesFileName}`,
    `${cssContents.join('\n')}`,
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
    emptyOutDir: true,
    minify: false,
    sourcemap: false,
    rollupOptions: {
      external: external,
      input: `${srcDir}/${stylesDirName}/${stylesFileName}`,
      output: { assetFileNames },
    },
  },
});
