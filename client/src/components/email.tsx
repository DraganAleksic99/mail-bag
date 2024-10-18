import { useLayoutEffect, useRef, useState } from "react";
import { useRouterState, useNavigate, Link } from "@tanstack/react-router";
import { toast } from "react-hot-toast";
import { Route } from "@/routes/messages/$mailbox/$emailId";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2, Sparkles, Reply, ArrowLeft } from "lucide-react";

export function Email() {
  const { data, mailbox } = Route.useLoaderData();
  const { email } = useRouterState({ select: (state) => state.location.state });
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate({ from: "/messages/$mailbox/$emailId" });

  useLayoutEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current?.offsetHeight);
  }, []);

  const deleteEmail = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:80/messages/${mailbox}/${email?.id}`,
        {
          method: "DELETE",
          headers: { Accept: "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Could not delete email. Try again later.");
      }

      const { message } = await response.json();

      toast.success(message, { duration: 3000 });
      setIsLoading(false);
      navigate({ to: "/mailboxes/$mailboxId", params: { mailboxId: mailbox } });
    } catch (error) {
      setIsLoading(false);
      toast.error((error as Record<string, string>).message);
    }
  };

  const initials = email?.from
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="max-h-screen max-w-2xl mx-auto h-full w-full min-w-full rounded-md">
      <CardHeader ref={headerRef} className="p-4">
        <div className="flex justify-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="mr-auto"
                variant="outline"
                onClick={() =>
                  navigate({
                    to: "/mailboxes/$mailboxId",
                    params: { mailboxId: mailbox },
                  })
                }
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Go Back</p>
            </TooltipContent>
          </Tooltip>

          <Button variant="outline">
            <Sparkles className="mr-2 h-4 w-4" />
            Summarize with AI
          </Button>
        </div>
        <div className="flex flex-row items-center gap-4 pt-1">
          <Avatar className="w-12 h-12">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl">{email?.subject}</CardTitle>
            <div className="text-sm text-muted-foreground pt-1">
              From: {email?.from} • {email?.date}
            </div>
            <div className="pt-4 flex items-center">
              <Link to="/messages/compose" state={{ email }}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="mr-4" variant="outline">
                      <Reply className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reply</p>
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="mr-4"
                    variant="outline"
                    onClick={deleteEmail}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 animate-spin stroke-black"
                      >
                        <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12"></path>
                      </svg>
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </CardHeader>
      <ScrollArea style={{ height: `calc(100% - ${headerHeight}px)` }}>
        <CardContent className="p-6 pt-0 max-w-[626px] whitespace-normal break-words">
          <div dangerouslySetInnerHTML={{ __html: data}} className="max-w-[592px]"></div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
