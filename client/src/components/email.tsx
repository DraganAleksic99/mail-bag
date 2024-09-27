import { useLayoutEffect, useRef, useState } from "react";
import { useRouterState, useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/messages/$mailbox/$emailId";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Trash2 } from "lucide-react";

export function Email() {
  const { data, mailbox } = Route.useLoaderData();
  const { email } = useRouterState({ select: (state) => state.location.state });
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current?.offsetHeight);
  }, []);

  const deleteEmail = async () => {
    const response = await fetch(
      `http://localhost:80/messages/${mailbox}/${email?.id}`,
      {
        method: "DELETE",
      }
    );

    const { message } = await response.json();
    console.log(message);
    navigate({ to: "/mailboxes/$mailboxId", params: { mailboxId: mailbox } });
  };

  const initials = email?.from
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="max-h-screen max-w-2xl mx-auto h-full w-full min-w-full rounded-md">
      <CardHeader ref={headerRef} className="flex flex-row items-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-xl">{email?.subject}</CardTitle>
          <div className="text-sm text-muted-foreground pt-1">
            From: {email?.from} • {email?.date}
          </div>
          <div className="pt-5">
            <Button className="mr-4" variant="outline" onClick={deleteEmail}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <ScrollArea style={{ height: `calc(100% - ${headerHeight}px)` }}>
        <CardContent className="p-6 pt-0 max-w-[616px] whitespace-normal break-words">
          <div className="max-w-[592px]">
            {data
              .split("\n")
              .map((paragraph, index) => (
                  <p key={index} className="">{paragraph}</p>
                )
              )}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
