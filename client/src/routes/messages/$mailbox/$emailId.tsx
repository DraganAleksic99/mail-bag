import { createFileRoute } from '@tanstack/react-router';
import DOMpurify from 'dompurify';
import { Email } from '@/components/email';
import { EmailSkeleton } from '@/components/email-skeleton';

export const Route = createFileRoute('/messages/$mailbox/$emailId')({
  loader: async ({ params: { mailbox, emailId }, abortController }) => {

    const response = await fetch(`https://mailbag-production-fe5f.up.railway.app/messages/${mailbox}/${emailId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      signal: abortController.signal,
    });

    const { emailAsHtml, emailAsText }: Record<string, string> = await response.json();

    return {
      emailAsHtml: DOMpurify.sanitize(emailAsHtml),
      emailAsText: emailAsText,
      mailbox
    };
  },
  component: Email,
  pendingComponent: EmailSkeleton,
});