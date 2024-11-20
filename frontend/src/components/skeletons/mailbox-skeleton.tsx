import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";

export function MailboxSkeleton() {
  return (
    <div className="max-h-screen w-full max-w-2xl mx-auto bg-background border rounded-lg shadow-sm">
      <div className="p-4 py-[18px] border-b">
        <Skeleton className="w-fit">
          <h2 className="text-2xl font-bold text-transparent">xxxxxxx</h2>
        </Skeleton>
      </div>
      <ScrollArea className="h-[calc(100vh-70px)]">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 border-b transition-colors"
          >
            <Skeleton className="rounded-full">
              <Avatar className="flex-shrink-0"></Avatar>
            </Skeleton>
            <div className="flex-grow min-w-0">
              <div className="flex items-center justify-between mb-1">
                <Skeleton className="w-full">
                  <span className="font-semibold text-transparent">
                    xxxxx xxxxxxxx
                  </span>
                </Skeleton>
              </div>
              <div className="text-sm font-medium mb-1 text-transparent">
                <Skeleton className="max-w-fit">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste
                  natus assumenda velit, modi tempora voluptatem repellat illum
                  nemo iure eaque!
                </Skeleton>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
