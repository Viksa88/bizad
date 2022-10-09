import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import routes from "./api/routes";

import { errorRequestHandler } from "./api/middlewares/errorHandler";
import { connectdb } from "./config/dbconnect";

const app: Application = express();

dotenv.config();
app.use(cors());
app.use(morgan("combined"));

connectdb();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("BizAd API is running");
});

/*
Configure Routes
*/
app.use("/api", routes);

app.use(errorRequestHandler);

const PORT: string = process.env.PORT || "5000";

app.listen(PORT, () => {
  console.log("Server is up and running");
});
