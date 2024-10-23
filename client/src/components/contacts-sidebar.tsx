import { ChangeEvent, FormEvent, useState } from "react";
import { Mail, Trash2, PlusIcon } from "lucide-react";
import { useRouter, Link } from "@tanstack/react-router";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface IContact {
  _id?: string;
  name: string;
  email: string;
}

export function ContactsSidebar({ contacts }: { contacts: IContact[] }) {
  const { toast } = useToast();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleContactDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://mailbag-production-fe5f.up.railway.app/contacts/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Could not delete contact. Please try again!");
      }

      const { message } = await response.json();

      router.invalidate();

      toast({
        title: message,
      });

      await new Promise((resolve) => {
        setTimeout(() => {
          setIsLoading(false);
          resolve(true);
        }, 500);
      });
    } catch (error) {
      setIsLoading(false);
      toast({
        title: (error as Record<string, string>).message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://mailbag-production-fe5f.up.railway.app/contacts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: crypto.randomUUID(), name, email }),
      });

      if (!response.ok) {
        throw new Error("Could not add contact. Try again later!");
      }

      const { message } = await response.json();

      toast({
        title: message,
      });

      router.invalidate();

      setIsLoading(false);
      setIsOpen(false);
      setName("");
      setEmail("");
    } catch (error) {
      setIsLoading(false);
      toast({
        title: (error as Record<string, string>).message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full h-screen border-l border-r border-t rounded-lg border-gray-200 dark:border-gray-800">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
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
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add New Contact</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  required
                  type="text"
                  id="name"
                  value={name}
                  className="col-span-3"
                  onChange={handleNameChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Email</Label>
                <Input
                  required
                  type="email"
                  id="email"
                  value={email}
                  className="col-span-3"
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button disabled={isLoading} type="submit" className="px-8">
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
                  "Add"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <ScrollArea className="h-[calc(100vh-73px)]">
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
                <Link
                  to="/messages/compose"
                  state={{ contactEmail: contact.email }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 hover:bg-accent mr-2"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Send Mail</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 hover:bg-accent"
                      onClick={() => handleContactDelete(contact._id!)}
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
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}
