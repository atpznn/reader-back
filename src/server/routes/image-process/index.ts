import multer from "multer";
import express, {
  type Request,
  type RequestHandler,
  type Response,
} from "express";
import { parseImageToText } from "../../../services/ocr";
import { dimeRouter } from "./dime";
import { binanceThRouter } from "./binance-th";
interface OCRBody {
  texts: string[];
}
export type OCRHandler = RequestHandler<any, any, OCRBody>;
const app = express();
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
}).array("images", 5);
function imageHelperMiddleWare(req: Request, res: Response, next: Function) {
  try {
    return upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.error("Multer Error:", err.message);
        return res.status(400).send(`Multer Error: ${err.message}`);
      } else if (err) {
        console.error("Unknown Error:", err);
        return res.status(500).send("An unknown error occurred during upload.");
      }
      const files = (req as any).files as Express.Multer.File[]; // Multer จะเพิ่ม 'files' เข้าไปใน Request
      if (!files || files.length === 0) {
        return res.status(400).send("No files were uploaded.");
      }
      const texts = [];
      console.log('found image file :', files.length)
      for (const file of files) {
        const text = await parseImageToText(file.buffer)
        console.log('cleaned text:', text)
        texts.push(text);
      }
      req.body.texts = texts;
      next();
    });
  } catch (ex) {
    return res.status(500).send(ex);
  }
}
app.use(imageHelperMiddleWare);
app.use("/image-process", dimeRouter);
app.use("/image-process", binanceThRouter);
export { app as imageProcessDimeRouter };
