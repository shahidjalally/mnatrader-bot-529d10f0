import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const repositoryName = "mnatrader-bot-529d10f0";
const isGitHubPagesBuild = process.env["GITHUB_ACTIONS"] === "true";

export default defineConfig({
  // GitHub project pages are served below /<repository>/ rather than at the
  // domain root. Local development and other hosts continue to use `/`.
  base: isGitHubPagesBuild ? `/${repositoryName}/` : "/",
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
