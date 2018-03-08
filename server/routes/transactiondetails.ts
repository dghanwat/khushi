import { Request, Response, Router } from "express";
import * as cors from "cors";

const transactionDetailsRouter: Router = Router();

transactionDetailsRouter.options("/:transactionId", cors(), (request: Request, response: Response) => {
  response.status(200).send(JSON.stringify("true"));
});

transactionDetailsRouter.get("/:transactionId", cors(), (request: Request, response: Response) => {
  const dataObject = require("../data/transaction/getTransactionDetails.json");
  response.status(200).send(JSON.stringify(dataObject));
});

transactionDetailsRouter.post("/", (request: Request, response: Response) => {
  response.status(200).send(JSON.stringify("success"));
});

export { transactionDetailsRouter };
