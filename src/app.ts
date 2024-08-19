import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running.");
});

app.all("*", (req: Request, res: Response) => {
  const error = {
    message: "Route not found.",
    statusCode: 404,
    method: req.method,
    url: req.originalUrl,
  };
  res.status(404).send([error]);
});

export default app;
