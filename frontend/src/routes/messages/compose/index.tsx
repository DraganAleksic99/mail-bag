import { createFileRoute } from "@tanstack/react-router";
import { ComposeEmail } from "@/components/compose-email";

export const Route = createFileRoute("/messages/compose/")({
  component: ComposeEmail,
});
