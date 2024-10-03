import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Trash2, PlusIcon } from "lucide-react";

export interface IContact {
  _id?: number;
  name: string;
  email: string;
}

export function ContactsSidebar() {
  const contacts = [
    {
      _id: "1",
      email: "ratherlongemail@gmail.com",
      name: "Dragan Aleksic",
    },
    {
      _id: "1",
      email: "ratherlongemail@gmail.com",
      name: "Dragan Aleksic",
    },
    {
      _id: "1",
      email: "ratherlongemail@gmail.com",
      name: "Dragan Aleksic",
    },
    {
      _id: "1",
      email: "ratherlongemail@gmail.com",
      name: "Dragan Aleksic",
    },
    {
      _id: "1",
      email: "ratherlongemail@gmail.com",
      name: "Dragan Aleksic",
    },
    {
      _id: "1",
      email: "ratherlongemail@gmail.com",
      name: "Dragan Aleksic",
    },
    {
      _id: "1",
      email: "ratherlongemail@gmail.com",
      name: "Dragan Aleksic",
    },
    {
      _id: "1",
      email: "ratherlongemail@gmail.com",
      name: "Dragan Aleksic",
    },
    {
      _id: "1",
      email: "ratherlongemail@gmail.com",
      name: "Dragan Aleksic",
    },
    {
      _id: "1",
      email: "ratherlongemail@gmail.com",
      name: "Dragan Aleksic",
    },
    {
      _id: "1",
      email: "ratherlongemail@gmail.com",
      name: "Dragan Aleksic",
    },
    {
      _id: "1",
      email: "ratherlongemail@gmail.com",
      name: "Dragan Aleksic",
    },
    {
      _id: "1",
      email: "ratherlongemail@gmail.com",
      name: "Dragan Aleksic",
    },
    {
      _id: "1",
      email: "ratherlongemail@gmail.com",
      name: "Dragan Aleksic",
    },
    {
      _id: "1",
      email: "ratherlongemail@gmail.com",
      name: "Dragan Aleksic",
    },
    {
      _id: "1",
      email: "ratherlongemail@gmail.com",
      name: "Dragan Aleksic",
    },
  ];

  return (
    <div className="w-full h-screen border-l border-r rounded-lg border-gray-200 dark:border-gray-800">
      <div className="p-4">
        <Button
          className="w-full justify-start gap-2 text-base flex items-center space-x-2 h-10"
          variant="outline"
        >
          <div className="rounded-full bg-accent h-7 w-7 flex items-center justify-center">
            <PlusIcon className="h-4 w-4" />
          </div>
            Add New Contact
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-72px)]">
        <nav className="p-4 pt-0">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="group flex items-center p-2 rounded-lg hover:bg-accent transition-colors relative mb-2"
            >
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${contact.name}`}
                  alt={contact.name}
                />
                <AvatarFallback>
                  {contact.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-md font-medium">{contact.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {contact.email}
                </p>
              </div>
              <div className="absolute right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 hover:bg-accent mr-2"
                >
                  <Mail className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 hover:bg-accent"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}
