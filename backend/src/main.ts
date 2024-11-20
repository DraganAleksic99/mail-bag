import path from "path";
import express, { Express, NextFunction, Response } from "express";
import cors from "cors";
import mailboxesRouter from "./routes/mailboxesRouter";
import messagesRouter from "./routes/messagesRouter";
import contactsRouter from "./routes/contactsRouter";
import emailRouter from "./routes/emailRouter";

const PORT = 80;
const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "../../client/dist")));

app.use(function (_, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

app.use(mailboxesRouter);
app.use(messagesRouter);
app.use(contactsRouter);
app.use(emailRouter);

app.listen(PORT, () => {
  console.log(`Server started and running on port ${PORT}`);
});
