import { Skeleton } from "../ui/skeleton";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function MailboxesSidebarSkeleton() {
  return (
    <div className="w-full h-screen bg-background border-r border-l border-t rounded-lg">
      <div className="p-4 pb-0">
        <Skeleton className="h-10 w-full rounded-md mr-4" />
      </div>
      <ScrollArea className="h-[calc(100vh-81px)]">
        <div className="space-y-2 p-4">
          {Array.from({ length: 15 }).map((_, i) => (
            <Skeleton key={i} className="text-transparent">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-base font-normal pointer-events-none"
              >
                xxxxxxx
              </Button>
            </Skeleton>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
