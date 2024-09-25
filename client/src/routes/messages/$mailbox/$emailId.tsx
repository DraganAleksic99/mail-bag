import { createFileRoute } from '@tanstack/react-router';
import { Email } from '@/components/email';

export const Route = createFileRoute('/messages/$mailbox/$emailId')({
  loader: async ({ params: { mailbox, emailId }, abortController }) => {

    const response = await fetch(`http://localhost:80/messages/${mailbox}/${emailId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      signal: abortController.signal,
    });

    const data: string = await response.json();

    return {
      data,
      mailbox
    };
  },
  component: Email,
})