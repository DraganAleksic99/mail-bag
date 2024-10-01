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

const listMessage = async (req: Request, res: Response) => {
  const { mailbox, folder, id } = req.params;

  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    const messageBody: string | undefined = await imapWorker.getMessageBody({
      mailbox: `${capitalizeParameter(mailbox)}${folder ? "/" + capitalizeParameter(folder) : ""}`,
      id: parseInt(id, 10),
    });

    res.status(200).json(messageBody);
  } catch (error) {
    res.send(`Error: \n ${error}`);
  }
}

const deleteMessage = async (req: Request, res: Response) => {
  const { mailbox, folder, id } = req.params;
  
  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    await imapWorker.deleteMessage({
      mailbox: `${capitalizeParameter(mailbox)}${folder ? "/" + capitalizeParameter(folder) : ""}`,
      id: parseInt(id, 10),
    });

    res.status(200).json({
      message: "Email successfully deleted."
    });
  } catch (error) {
    res.status(400).json(`Error: \n ${error}`);
  }
} 

export { listMessages, listMessage, deleteMessage };
