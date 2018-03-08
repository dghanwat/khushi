import { Request, Response, Router } from "express";
import * as cors from "cors";

const transactionRouter: Router = Router();

transactionRouter.get("/", cors(), (request: Request, response: Response) => {
  const dataObject = require("../data/transaction/getTransaction.json");
  response.send(JSON.stringify(dataObject));
});

transactionRouter.options("/", cors(), (request: Request, response: Response) => {
  response.status(200).send(JSON.stringify("true"));
});

export { transactionRouter };
