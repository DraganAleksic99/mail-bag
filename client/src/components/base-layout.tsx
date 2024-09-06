import { Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Button } from "@/components/ui/button";
import { Route } from "@/routes/__root";

export function BaseLayout() {
  const data = Route.useLoaderData();

  return (
    <>
      <nav className="p-4 pb-0 w-full">
        <ul className="flex gap-2">
          <li>
            <Link to="/" className="">
              <Button>New Message</Button>
            </Link>
          </li>
          <li>
            <Link to="/" className="">
              <Button>New Contact</Button>
            </Link>
          </li>
        </ul>
      </nav>
      <main className="p-4 pb-0">
        <div className="min-h-[calc(100vh-68px)] h-[calc(100vh-68px)] flex gap-3">
          <div className="w-1/5 min-h-full overflow-y-auto border-r-2 border-black flex flex-col">
            <h1>Hi!</h1>
          </div>
          <div className="w-1/2 min-h-full">
            <Outlet />
          </div>
          <div className="w-[30%] min-h-full overflow-y-auto border-l-2 border-black flex flex-col">
            <h1>Hi!</h1>
          </div>
        </div>
      </main>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
