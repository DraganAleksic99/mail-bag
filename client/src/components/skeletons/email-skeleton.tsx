import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function EmailSkeleton() {
  return (
    <Skeleton>
      <Card className="max-w-2xl mx-auto h-full w-full rounded-md">
        <CardHeader className="p-4 h-[168px]">
          <div className="flex justify-end">
            <Skeleton className="h-9 w-12 rounded-md mr-auto" />
            <Skeleton className="h-9 w-36 rounded-md" />
          </div>
          <div className="flex flex-row items-center gap-4 pt-1">
            <Avatar className="w-12 h-12 text-transparent">
              <AvatarFallback>X</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-xl text-transparent">
                <Skeleton>xxxxx xxxxxx xxxxxxx xxxx</Skeleton>
              </CardTitle>
              <div className="text-sm text-transparent mt-2">
                <Skeleton>From: xxxxxxxxxxxxx • xxxxxxxxxxxxx</Skeleton>
              </div>
              <div className="pt-4 flex items-center">
                <Skeleton className="h-9 w-12 rounded-md mr-4" />
                <Skeleton className="h-9 w-12 rounded-md mr-4" />
              </div>
            </div>
          </div>
        </CardHeader>
        <ScrollArea className="h-[calc(100vh-170px)] pt-2">
          <CardContent className="p-4 pt-0">
            <div>
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i}>
                  <p className="mt-2 text-transparent">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Sed autem earum eaque fugit? Commodi rem sed, laudantium
                    aperiam
                  </p>
                </Skeleton>
              ))}
            </div>
          </CardContent>
        </ScrollArea>
      </Card>
    </Skeleton>
  );
}
