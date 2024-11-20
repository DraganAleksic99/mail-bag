import { createRootRoute } from "@tanstack/react-router";
import { BaseLayout } from "@/components/base-layout";
import { BaseLayoutSkeleton } from "@/components/skeletons/base-layout-skeleton";
import { type IContact } from "@/components/contacts-sidebar";

export type Mailbox = {
  name: string;
  path: string;
};

export const Route = createRootRoute({
  loader: async ({ abortController }) => {
    const [mailboxesResponse, contactsResponse] = await Promise.all([
      fetch("https://mailbag-production-fe5f.up.railway.app/mailboxes", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        signal: abortController.signal,
      }),
      fetch("https://mailbag-production-fe5f.up.railway.app/contacts", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        signal: abortController.signal,
      }),
    ]);

    const mailboxes: Mailbox[] = await mailboxesResponse.json();
    let contacts: IContact[] = await contactsResponse.json();

    contacts = contacts.reverse();

    return {
      mailboxes,
      contacts,
    };
  },
  staleTime: Infinity,
  pendingMs: 500,
  wrapInSuspense: true,
  pendingComponent: BaseLayoutSkeleton,
  component: BaseLayout,
});
