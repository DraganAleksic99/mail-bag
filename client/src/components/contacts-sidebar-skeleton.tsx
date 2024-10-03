import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export function ContactsSidebarSkeleton() {
  return (
    <div className="w-full h-screen border-l border-r rounded-lg border-gray-200 dark:border-gray-800">
      <div className="p-4">
        <Skeleton className="h-9 w-full rounded-md mr-4" />
      </div>
      <ScrollArea className="h-[calc(100vh-68px)]">
        <nav className="p-4 pt-0 w-full">
          {Array.from({ length: 15 }).map(() => (
            <div className="flex items-center p-2 rounded-lg hover:bg-accent transition-colors relative mb-2 w-full">
              <Avatar className="w-12 h-12 text-transparent">
            <AvatarFallback>X</AvatarFallback>
          </Avatar>
              <div className="ml-3 w-full">
                <Skeleton>
                  <p className="text-md font-medium text-transparent mb-[2px]">Xxxxxx Xxxxxxx</p>
                </Skeleton>
                <Skeleton>
                  <p className="text-sm text-transparent">
                    xxxxxxxxxxxxxxxxxxxx
                  </p>
                </Skeleton>
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}
