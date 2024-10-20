import { useState, FormEvent, useEffect } from "react";
import { Send, Sparkles, ArrowLeft } from "lucide-react";
import { useRouterState, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

export function ComposeEmail() {
  const { email, contactEmail } = useRouterState({
    select: (state) => state.location.state,
  });
  const router = useRouter();
  const { toast } = useToast();
  const [to, setTo] = useState(email?.from || contactEmail || "");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsub = router.history.subscribe(() => {
      const { contactEmail, email } = router.state.location.state;

      if (contactEmail) {
        setTo(contactEmail);
      } else if (email) {
        setTo(email.from);
      } else {
        setTo("");
      }
    });

    return () => {
      unsub();
    };
  }, [contactEmail, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:80/messages", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, subject, message }),
      });

      if (!response.ok) {
        throw new Error("Could not send email. Please try again!");
      }

      const { message: msg } = await response.json();

      toast({
        title: "Email Sent",
        description: msg,
      });

      setTo("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: (error as Record<string, string>).message,
      });
    }
  };

  return (
    <div className="min-h-screen w-full max-w-2xl mx-auto bg-background border rounded-lg shadow-sm">
      <div className="border-b p-4">
        <div className="flex justify-between items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={() => router.history.back()}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go Back</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Sparkles className="mr-2 h-4 w-4" />
              Compose with AI
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="to"
              className="block text-sm font-medium text-gray-700"
            >
              To:
            </label>
            <Input
              type="email"
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
              placeholder="recipient@example.com"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject:
            </label>
            <Input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              placeholder="Enter subject"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message:
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Type your message here"
              className="min-h-[300px] w-full"
            />
          </div>
          <div className="p-0 pt-6 flex justify-between items-center">
            <div className="flex space-x-2">
              <Button type="submit" className="px-4 text-white">
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
