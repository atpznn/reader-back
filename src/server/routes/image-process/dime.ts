import express from "express";
import type { OCRHandler } from ".";
import { TransactionExtractor } from "../../../services/dime/transaction/transaction-extractor";
import { DatePatternExtractor } from "../../../services/extracter/patterns/date-pattern-extractor";
const app = express();
const dimeHandler: OCRHandler = (req, res) => {
  const extractorResults = [];
  for (const text of req.body.texts) {
    const dateExtractor = new DatePatternExtractor();
    const extractor = new TransactionExtractor(dateExtractor, text);
    console.log(text);
    extractorResults.push({
      json: extractor.toJson(),
      text: extractor.getTexts(),
    });
  }
  res.json(extractorResults);
};

app.post("/dime", dimeHandler);
export { app as dimeRouter };
