import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Route } from "@/routes/mailboxes/$mailboxId";
import { capitalizeString } from "@/lib/utils";

export const numOfEmails = atom<null | number>(null);
export const emailIdAtom = atom<null | string>(null);

export function Mailbox() {
  const setEmailCount = useSetAtom(numOfEmails);
  const setEmailId = useSetAtom(emailIdAtom);
  const { data: emails, mailboxId } = Route.useLoaderData();

  useEffect(() => {
    setEmailCount(emails.length);
  }, [emails, setEmailCount]);

  return (
    <div className="max-h-screen w-full max-w-2xl mx-auto bg-background border rounded-lg shadow-sm">
      <div className="p-4 py-[18px] border-b">
        <h2 className="text-2xl font-bold">{capitalizeString(mailboxId)}</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-70px)]">
        {emails.map(({ id, from, date, subject }) => (
          <Link
            key={id}
            to="/messages/$mailbox/$emailId"
            params={{ mailbox: mailboxId, emailId: id }}
            state={{
              email: {
                from,
                date,
                subject,
                id,
              }
            }}
            onClick={() => setEmailId(id)}
          >
            <div className="flex items-center gap-4 p-4 border-b transition-colors hover:bg-accent">
              <Avatar className="flex-shrink-0">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${from}`}
                />
                <AvatarFallback>
                  {from
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">{from}</span>
                  <span className="text-sm text-muted-foreground">{date}</span>
                </div>
                <div className="text-sm font-medium mb-1">
                  {subject}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </ScrollArea>
    </div>
  );
}
