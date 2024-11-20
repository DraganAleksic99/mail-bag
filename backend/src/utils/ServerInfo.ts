import "dotenv/config";
import path from "path";
import fs from "fs";
const { env } = process;

interface IServerInfo {
  smtp: {
    host: string;
    port: number;
    auth: { user: string; pass: string };
  };
  imap: {
    host: string;
    port: number;
    auth: { user: string; pass: string };
  };
}

const rawInfo = fs.readFileSync(
  path.join(__dirname, "../../serverInfo.json"),
  "utf8"
);

const serverInfo: IServerInfo = JSON.parse(rawInfo);

serverInfo.imap.auth.pass = env.GMAIL_PASS!;
serverInfo.smtp.auth.pass = env.GMAIL_PASS!;

serverInfo.imap.auth.user = env.GMAIL_USER!;
serverInfo.smtp.auth.user = env.GMAIL_USER!;

export { serverInfo, IServerInfo };
