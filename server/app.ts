import { json, urlencoded } from "body-parser";
import * as compression from "compression";
import * as express from "express";
import * as path from "path";

import * as cors from "cors";
import { transactionRouter } from "./routes/transaction";
import { transactionDetailsRouter } from "./routes/transactiondetails";

const app: express.Application = express();
const router = express.Router();

app.disable("x-powered-by");
app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));

// Options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: true,
};

// Use cors middleware
router.use(cors(options));

// Add your routes
app.use("/api/transactions", transactionRouter);
app.use("/api/transactiondetails", transactionDetailsRouter);

// Enable pre-flight
router.options("*", cors(options));

console.log("Environment is ", app.get("env"));

if (app.get("env") === "production") {

  // in production mode run application from dist folder
  console.log("Running in production mode with UI");
  app.use(express.static(path.join(__dirname, "/../client")));
}

app.use("/environment/config", cors(), function(req, res) {
  const env = process.env.COEUS_ENVIRONMENT || "development";
  const enviornment = {
    "env": env,
  };
  res.status(200).send(JSON.stringify(enviornment));
});

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next) => {
  const err = new Error("Not Found");
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message,
  });
});

export { app };
