import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Route } from "@/routes/messages/$mailbox/$emailId";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "./ui/scroll-area";

export function Email() {
  const data = Route.useLoaderData();
  const { email } = useRouterState({ select: (state) => state.location.state });
  const headerRef = useRef<null | HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState("");

  useEffect(() => {
    setHeaderHeight(`${headerRef.current?.offsetHeight}`);
  }, [])

  const initials = email?.from
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="max-w-2xl mx-auto h-full w-full">
        <CardHeader ref={headerRef} className="flex flex-row items-center gap-4">
          <Avatar className="w-12 h-12">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl">{email?.subject}</CardTitle>
            <div className="text-sm text-muted-foreground">
              From: {email?.from} • {email?.date}
            </div>
          </div>
        </CardHeader>
      <ScrollArea className={`h-[calc(100%-${headerHeight}px)] w-full`}>
        <CardContent className="p-6">
          <div>
            {data.split("\n").map((paragraph, index) => (
              paragraph.startsWith("https") ? undefined : <p key={index}>{paragraph}</p>
            ))}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
