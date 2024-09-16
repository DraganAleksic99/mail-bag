import { Outlet } from "@tanstack/react-router";
import { MailboxesSidebarSkeleton } from "./mailboxes-sidebar-skeleton";

export function BaseLayoutSkeleton() {
  return (
    <>
      <main>
        <div className="min-h-screen h-screen flex gap-3">
          <div className="w-1/5 min-h-full flex flex-col">
            <MailboxesSidebarSkeleton />
          </div>
          <div className="w-1/2 min-h-full">
            <Outlet />
          </div>
          <div className="w-[30%] min-h-full overflow-y-auto flex flex-col">
            <h1>Hi!</h1>
          </div>
        </div>
      </main>
    </>
  );
}
