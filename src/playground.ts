import fs from "fs";
import {
  parseImageToText,
  readImageBufferFromPath,
} from "./services/ocr/index.js";
import { TransactionExtractor } from "./services/dime/transaction/transaction-extractor.js";
import { DatePatternExtractor } from "./services/extracter/patterns/date-pattern-extractor.js";
import { getInvestmentJsonFormImage } from "./services/dime/stock-slip/index.js";
// import { DatePatternExtractor } from "../unuse/extracter/patterns/date-pattern-extractor.js";

async function testInvestmentImage() {
  const images = [
    "./pic/1000000972.jpg",
    "./pic/1000000973.jpg",
    "./pic/1000000974.jpg",
    "./pic/1000000975.jpg",
    "./pic/1000000976.jpg",

    "./pic/1000000977.jpg",
    "./pic/1000000978.jpg",
    "./pic/1000000980.jpg",
  ];
  const imageFiles = await Promise.all(images.map((x) => fs.readFileSync(x)));
  const jsons = imageFiles.map((x) =>
    getInvestmentJsonFormImage(Buffer.from(x.buffer))
  );
  return jsons;
}

// async function testDividendImage() {
//   const images = ["./pic/1000001054.jpg", "./pic/1000001055.jpg"];
//   const imageFiles = await Promise.all(images.map((x) => fs.readFileSync(x)));
//   const jsons = imageFiles.map((x) =>
//     // getDividendJsonFormImage(Buffer.from(x.buffer))
//   );
//   return jsons;
// }
fs.readdir("./imageTest/dime", async (err, langFolders) => {
  for (const langFolder of langFolders) {
    const folders = fs.readdirSync(`./imageTest/dime/${langFolder}`);
    for (const folder of folders) {
      const files = fs.readdirSync(`./imageTest/dime/${langFolder}/${folder}`);

      for (const file of files) {
        const text = await parseImageToText(
          await readImageBufferFromPath(
            `./imageTest/dime/${langFolder}/${folder}/${file}`
          )
        );
        console.log(
          `${langFolder}/${folder}/${file}: \n\n${text}\n---------------------\n`
        );
        // const dateExtractor = new DatePatternExtractor();
        // const transaction = new TransactionExtractor(dateExtractor, text);
        // console.log(transaction.toJson());
      }
    }
  }
});
