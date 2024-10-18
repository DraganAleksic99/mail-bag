import { createFileRoute } from '@tanstack/react-router';
import DOMpurify from 'dompurify';
import { Email } from '@/components/email';
import { EmailSkeleton } from '@/components/email-skeleton';

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
      data: DOMpurify.sanitize(data),
      mailbox
    };
  },
  component: Email,
  pendingComponent: EmailSkeleton,
});