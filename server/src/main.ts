import path from "path";
import express, { Express, NextFunction, Response } from "express";

const PORT = 80;

const app: Express = express();

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "../../client/dist")));

app.use(function (_, response: Response, next: NextFunction) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(PORT, () => {
  console.log(`Server started and running on port ${PORT}`);
});
