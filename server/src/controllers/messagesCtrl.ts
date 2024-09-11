import { Request, Response } from "express";
import * as IMAP from "../lib/IMAP";
import { serverInfo } from "../utils/ServerInfo";
import { capitalizeParameter } from "../utils/capitalizeParameter";

const listMessages = async (req: Request, res: Response) => {
  const { mailbox, folder } = req.params;

  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    const messages: IMAP.IMessage[] = await imapWorker.listMessages({
      mailbox: `${capitalizeParameter(mailbox)}${folder ? "/" + capitalizeParameter(folder) : ""}`,
    });

    res.status(200).json(messages);
  } catch (error) {
    res.send(`Error: \n ${error}`);
  }
};

export { listMessages };
