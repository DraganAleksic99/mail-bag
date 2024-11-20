import { Request, Response } from "express";
import * as IMAP from "../lib/IMAP";
import { serverInfo } from "../utils/ServerInfo";

const listMailboxes = async (_: Request, res: Response) => {
  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();

    res.status(200).json(mailboxes);
  } catch (error) {
    res.status(400).json({ error: `Error: \n ${error}` });
  }
};

export { listMailboxes };
