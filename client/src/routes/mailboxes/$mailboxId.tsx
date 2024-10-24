import { createFileRoute } from "@tanstack/react-router";
import { Mailbox } from "@/components/mailbox";
import { MailboxSkeleton } from "@/components/skeletons/mailbox-skeleton";

export type TEmail = {
  id: string;
  from: string;
  subject: string;
  date: string;
}

export const Route = createFileRoute("/mailboxes/$mailboxId")({
  loader: async ({ params: { mailboxId }, abortController }) => {

    const response = await fetch(`https://mailbag-production-fe5f.up.railway.app/mailboxes/${mailboxId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      signal: abortController.signal,
    });

    const data: TEmail[] = await response.json();

    return {
      data: data.reverse(),
      mailboxId,
    };
  },
  pendingMs: 500,
  wrapInSuspense: true,
  component: Mailbox,
  pendingComponent: MailboxSkeleton,
});
