import { Request, Response } from "express";
import * as IMAP from "../lib/IMAP";
import { serverInfo } from "../utils/ServerInfo";

const listMessages = async (req: Request, res: Response) => {
  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    const messages: IMAP.IMessage[] = await imapWorker.listMessages({
      mailbox: req.params.mailbox,
    });

    res.status(200).json(messages);
  } catch (error) {
    res.send(`Error: \n ${error}`);
  }
};

export { listMessages };
