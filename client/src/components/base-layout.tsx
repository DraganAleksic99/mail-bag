import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { MailboxesSidebar } from "./mailboxes-sidebar";
import { ContactsSidebar } from "./contacts-sidebar";
import { Route } from "@/routes/__root";;

export function BaseLayout() {
  const data = Route.useLoaderData();

  return (
    <>
      <main>
        <div className="min-h-screen] h-screen flex gap-3">
          <div className="w-1/5 min-h-full flex flex-col">
            <MailboxesSidebar mailboxes={data} />
          </div>
          <div className="w-1/2 min-h-full">
            <Outlet />
          </div>
          <div className="w-[30%] min-h-full overflow-y-auto flex flex-col">
            <ContactsSidebar />
          </div>
        </div>
      </main>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
