const ImapClient = require("emailjs-imap-client");
import { IServerInfo } from "../utils/ServerInfo";

export interface IImapClient extends Record<string, any> {}

export interface IMailboxes {
  root: boolean;
  children: IMailbox[];
}

export interface IMailbox {
  name: string;
  path: string;
  children?: IMailbox[];
}

export interface ICallOptions {
  mailbox: string;
  id?: number;
}

export interface IMessage {
  id: string;
  date: string;
  from: string;
  subject: string;
  body?: string;
}

export interface IMailboxInfo {
  exists: number;
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export class Worker {
  private static serverInfo: IServerInfo;

  constructor(serverInfo: IServerInfo) {
    Worker.serverInfo = serverInfo;
  }

  private async connectToServer(): Promise<IImapClient> {
    const client: IImapClient = new ImapClient.default(
      Worker.serverInfo.imap.host,
      Worker.serverInfo.imap.port,
      { auth: Worker.serverInfo.imap.auth }
    );

    client.logLevel = client.LOG_LEVEL_NONE;

    client.onerror = (error: Error) => {
      console.log("IMAP.Worker.listMailboxes(): Connection error", error);
    };

    await client.connect();

    return client;
  }

  public async listMailboxes(): Promise<IMailbox[]> {
    const client: IImapClient = await this.connectToServer();
    const mailboxes: IMailboxes = await client.listMailboxes();

    await client.close();

    const finalMailboxes: IMailbox[] = [];

    const iterateChildren = (children: IMailbox[]): void => {
      children.forEach((child: IMailbox) => {
        finalMailboxes.push({
          name: child.name,
          path: child.path,
        });

        child.children && iterateChildren(child.children);
      });
    };

    iterateChildren(mailboxes.children);

    return finalMailboxes;
  }

  public async listMessages(callOptions: ICallOptions): Promise<IMessage[]> { 
    const client: IImapClient = await this.connectToServer();
    const mailbox: IMailboxInfo = await client.selectMailbox(callOptions.mailbox);

    if (mailbox.exists === 0) {
      await client.close();
      return [];
    }

    const messages: any[] = await client.listMessages(
      callOptions.mailbox,
      "1:*",
      ["uid", "envelope"]
    );

    await client.close();

    const finalMessages: IMessage[] = [];

    messages.forEach((message: any) => {
      const { uid, envelope } = message;

      finalMessages.push({
        id: uid,
        date: envelope.date,
        from: envelope.from[0].address,
        subject: envelope.subject,
      });
    });

    return finalMessages;
  }
}
