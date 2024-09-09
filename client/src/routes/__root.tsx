import { createRootRoute } from "@tanstack/react-router";
import { BaseLayout } from "@/components/base-layout";
import { BaseLayoutSkeleton } from "@/components/base-layout-skeleton";

export type Mailbox = {
  name: string;
  path: string;
}

export const Route = createRootRoute({
  loader: async ({ abortController }) => {
    const response = await fetch("http://localhost:80/mailboxes", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      signal: abortController.signal,
    });

    const data: Mailbox[] = await response.json();

    return data;
  },
  staleTime: Infinity,
  pendingMs: 500,
  wrapInSuspense: true,
  pendingComponent: BaseLayoutSkeleton,
  component: BaseLayout,
});
