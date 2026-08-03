import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // The production site is served from the root of bot.mnatrader.com. Using
  // the repository path here makes every asset request 404 on that domain.
  base: "/",
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
      },
    }),
    // Nitro provides the build-time server used by TanStack's prerenderer.
    // GitHub Pages receives only the generated files from .output/public.
    nitro({ preset: "node-server" }),
    viteReact(),
  ],
  server: {
    host: "::",
    port: 8080,
  },
});
