import { useState, FormEvent, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { Send, Sparkles, ArrowLeft, X } from "lucide-react";
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
  const [prompt, setPrompt] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null)

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

  const handleComposeEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputPrompt = prompt;
    setPrompt("");
    setIsLoading(true);

    try {
      const response = await fetch(`https://mailbag-production-fe5f.up.railway.app/email/compose`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputPrompt }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("a:")) {
            const content = JSON.parse(line.slice(2));
            setSubject(content.result.subject);
            setMessage(content.result.message);
          }
        }
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: (error as Record<string, string>).message,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://mailbag-production-fe5f.up.railway.app/messages", {
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
            <Button
              variant="outline"
              onClick={() => {
                flushSync(() => {
                  setIsInputVisible(true)
                })
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
              disabled={isInputVisible}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Compose with AI
            </Button>
          </div>
        </div>
      </div>
      {isInputVisible && (
        <div>
          <form onSubmit={handleComposeEmail} className="flex p-4 pb-2 gap-x-2">
            <Input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
              minLength={20}
              placeholder="Describe an email"
              className="w-full"
              ref={inputRef}
            />
            <Button variant="outline" type="submit" className="px-4">
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
                "Compose"
              )}
            </Button>
            <Button variant="outline" onClick={() => setIsInputVisible(false)}>
              <X className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
      <div className="p-4">
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
