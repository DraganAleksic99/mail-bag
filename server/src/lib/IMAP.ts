const ImapClient = require("emailjs-imap-client");
import { IServerInfo } from "../utils/ServerInfo";

export interface IImapClient extends Record<string, any> {}

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
}
