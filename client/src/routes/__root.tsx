import { createRootRoute } from "@tanstack/react-router";
import { BaseLayout } from "@/components/base-layout";
import { BaseLayoutSkeleton } from "@/components/base-layout-skeleton";
import { type IContact } from "@/components/contacts-sidebar";

export type Mailbox = {
  name: string;
  path: string;
};

export const Route = createRootRoute({
  loader: async ({ abortController }) => {
    const [mailboxesResponse, contactsResponse] = await Promise.all([
      fetch("http://localhost:80/mailboxes", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        signal: abortController.signal,
      }),
      fetch("http://localhost:80/contacts", {
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
