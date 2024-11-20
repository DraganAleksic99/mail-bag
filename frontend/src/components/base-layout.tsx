import { Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MailboxesSidebar } from "./mailboxes-sidebar";
import { ContactsSidebar } from "./contacts-sidebar";
import { Route } from "@/routes/__root";

export function BaseLayout() {
  const { mailboxes, contacts } = Route.useLoaderData();

  return (
    <>
      <main>
        <TooltipProvider>
          <div className="min-h-screen] h-screen flex gap-3">
            <div className="w-1/5 min-h-full flex flex-col">
              <MailboxesSidebar mailboxes={mailboxes} />
            </div>
            <div className="w-1/2 min-h-full">
              <Outlet />
            </div>
            <div className="w-[30%] min-h-full overflow-y-auto flex flex-col">
              <ContactsSidebar contacts={contacts} />
            </div>
          </div>
          <Toaster />
        </TooltipProvider>
      </main>
    </>
  );
}
