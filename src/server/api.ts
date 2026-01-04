import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import { imageProcessDimeRouter } from "./routes/image-process/index.js";
const app: Express = express();
const port: number = 8080;
app.use(cors());
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});
app.use(imageProcessDimeRouter);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
