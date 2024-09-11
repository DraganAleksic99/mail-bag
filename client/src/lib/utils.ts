import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Mailbox } from "@/routes/__root";
import {
  Inbox,
  Send,
  File,
  Trash2,
  Archive,
  Star,
  AlertCircle,
  Paperclip,
  Mail,
} from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeString([firstLetter, ...rest]: string) {
  return firstLetter.toUpperCase() + rest.join("");
}

export function mapMailboxesToIcons(mailboxes: Mailbox[]) {
  const arr = [];

  for (const { name, path } of mailboxes) {
    switch (path) {
      case "inbox": {
        arr.push({
          name,
          path,
          icon: Inbox,
        })
      }
        break;
      case "drafts": 
      break;
      case "saved": {
        arr.push({
          name,
          path,
          icon: Archive,
        })
      }
      break;
      case "[gmail]/drafts": {
        arr.push({
          name,
          path,
          icon: File,
        })
      }
      break;
      case "[gmail]/all mail": {
        arr.push({
          name,
          path,
          icon: Mail,
        })
      }
      break;
      case "[gmail]/bin": {
        arr.push({
          name,
          path,
          icon: Trash2,
        })
      }
      break;
      case "[gmail]/important": {
        arr.push({
          name,
          path,
          icon: Paperclip,
        })
      }
      break;
      case "[gmail]/sent mail": {
        arr.push({
          name,
          path,
          icon: Send,
        })
      }
      break;
      case "[gmail]/spam": {
        arr.push({
          name,
          path,
          icon: AlertCircle,
        })
      }
      break;
      case "[gmail]/starred": {
        arr.push({
          name,
          path,
          icon: Star,
        })
      }
      break;
      default:
        break;
    }
  }

  return arr;
}
