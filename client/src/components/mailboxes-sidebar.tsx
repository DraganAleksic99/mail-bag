import { useAtom, useAtomValue } from "jotai";
import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail } from "lucide-react";
import type { Mailbox } from "@/routes/__root";
import { mapMailboxesToIcons, cn, parsePathname } from "@/lib/utils";
import { numOfEmails, emailIdAtom } from "./mailbox";

export function MailboxesSidebar({ mailboxes }: { mailboxes: Mailbox[] }) {
  const { pathname } = useLocation();
  const [emailsCount, setEmailsCount] = useAtom(numOfEmails);
  const emailId = useAtomValue(emailIdAtom);

  return (
    <div className="w-full h-screen bg-background border-r border-l border-t rounded-lg">
      <div className="p-4 pb-0">
        <Link to="/messages/compose">
          <Button
            className="w-full justify-start gap-2 text-base h-10"
            variant="outline"
          >
            <div className="rounded-full bg-accent h-7 w-7 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            Compose
          </Button>
        </Link>
      </div>
      <ScrollArea className="h-[calc(100vh-81px)]">
        <div className="space-y-2 p-4">
          {mapMailboxesToIcons(mailboxes || []).map((mailbox) => (
            <Link
              key={mailbox.name}
              className={cn(
                "block rounded-md",
                `${`/mailboxes/${mailbox.path}` === parsePathname(pathname) && "bg-accent"}`,
                `${`/messages/${mailbox.path}/${emailId}` === parsePathname(pathname) && "bg-accent"}`
              )}
              to="/mailboxes/$mailboxId"
              params={{ mailboxId: mailbox.path }}
              onClick={() => {
                setEmailsCount(0);
              }}
              activeProps={{
                className: "bg-accent",
              }}
            >
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-base"
              >
                {mailbox.icon && (
                  <mailbox.icon
                    className={cn(
                      "w-6 h-6 text-muted-foreground",
                      `${`/mailboxes/${mailbox.path}` === parsePathname(pathname) && "stroke-black"}`,
                      `${`/messages/${mailbox.path}/${emailId}` === parsePathname(pathname) && "stroke-black"}`
                    )}
                  />
                )}
                {mailbox.name}
                {(`/mailboxes/${mailbox.path}` === pathname ||
                  `/mailboxes/${mailbox.path}` === parsePathname(pathname) ||
                  `/messages/${mailbox.path}/${emailId}` ===
                    parsePathname(pathname)) && (
                  <span
                    className={cn(
                      "ml-auto bg-primary text-xs rounded-full px-2 py-1",
                      `${emailsCount === 0 ? "text-transparent animate-pulse" : "text-primary-foreground"}`
                    )}
                  >
                    {emailsCount}
                  </span>
                )}
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
