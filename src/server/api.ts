import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import { TaskManager } from "../services/task/task";
import v1DimeRoute from "./v1-routes/dime";
import v2BinanceThRoute from "./v2-routes/binance-th";
import v2DimeRoute from "./v2-routes/dime";
import v1BinanceThRoute from "./v1-routes/binance-th";
const app: Express = express();
const port: number = 8080;
app.use(cors());

app.use((req, res, next) => {
  const requestTime = new Date(Date.now()).toISOString();
  console.log(`[${requestTime}] ${req.method} ${req.url}`);
  next();
});
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});
export function profilerMiddleware(req: Request, res: Response, next: Function) {
  // 1. เริ่มจับเวลาและสถานะทรัพยากรก่อนเข้า Route
  const startTick = process.hrtime();
  const startUsage = process.cpuUsage();
  const startMemory = process.memoryUsage().heapUsed;

  // เมื่อ Response ส่งกลับไปหา Client เสร็จสิ้น
  res.on('finish', () => {
    // 2. คำนวณความต่าง (Diff)
    const diffTick = process.hrtime(startTick);
    const diffUsage = process.cpuUsage(startUsage);
    const endMemory = process.memoryUsage().heapUsed;

    // แปลงหน่วย
    const durationInMs = (diffTick[0] * 1e3 + diffTick[1] * 1e-6).toFixed(3);
    const cpuUser = (diffUsage.user / 1000).toFixed(3); // มิลลิวินาที
    const cpuSystem = (diffUsage.system / 1000).toFixed(3); // มิลลิวินาที
    const memoryDiff = ((endMemory - startMemory) / 1024 / 1024).toFixed(3); // MB

    console.log(`--- Profiler: ${req.method} ${req.originalUrl} ---`);
    console.log(`⏱️  Time: ${durationInMs} ms`);
    console.log(`💻 CPU User: ${cpuUser} ms | CPU System: ${cpuSystem} ms`);
    console.log(`🧠 RAM Delta: ${memoryDiff} MB`);
    console.log('-----------------------------------');
  });

  next();
};
const tasks = new TaskManager(20)
app.use(v1BinanceThRoute());
app.use(v2DimeRoute(tasks));
app.use(v1DimeRoute());
app.use(v2BinanceThRoute(tasks));
app.use(express.json());
app.use(profilerMiddleware)
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.message)
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: err.message || 'Internal Server Error',
  });
});
try {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}
catch (ex) {
  console.error(ex)
}
