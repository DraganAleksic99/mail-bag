import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/mailboxes/')({
  beforeLoad: () => {
    return redirect({ to: "/mailboxes/$mailboxId", params: { mailboxId: "inbox", }});
  }
});
