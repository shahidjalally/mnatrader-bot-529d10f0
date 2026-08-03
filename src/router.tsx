import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();
  // The build-time renderer requests `/`, while the hydrated app runs below
  // the GitHub repository path in the browser.
  const basepath =
    typeof window === "undefined" ? "/" : import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

  const router = createRouter({
    routeTree,
    context: { queryClient },
    basepath,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
