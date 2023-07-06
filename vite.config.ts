import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";

const indexHtml = resolve(__dirname, "index.html");
const port = Number(process.env.DEV_PORT) || undefined;

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    port,
  },
  build: {
    rollupOptions: {
      input: {
        main: indexHtml,
      },
    },
  },
});
