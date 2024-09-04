import path from "path";
import fs from "fs";

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

export { serverInfo, IServerInfo };
