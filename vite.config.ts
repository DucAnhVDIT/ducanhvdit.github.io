import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  build: {
    commonjsOptions: {
      include: ["tailwind.config.js", "node_modules/**"],
    },
    target: "esnext",
  },
  optimizeDeps: {
    include: ["tailwind-config"],
  },
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "tailwind-config": path.resolve(__dirname, "./tailwind.config.js"),
    },
  },
});
