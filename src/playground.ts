import fs from "fs";
import {
  parseImageToText,
  readImageBufferFromPath,
} from "./services/ocr/index.js";

// fs.readdir("./imageTest/dime", async (err, langFolders) => {
//   for (const langFolder of langFolders) {
//     const folders = fs.readdirSync(`./imageTest/dime/${langFolder}`);
//     for (const folder of folders) {
//       const files = fs.readdirSync(`./imageTest/dime/${langFolder}/${folder}`);

//       for (const file of files) {
//         const text = await parseImageToText(
//           await readImageBufferFromPath(
//             `./imageTest/dime/${langFolder}/${folder}/${file}`
//           )
//         );
//         console.log(
//           `${langFolder}/${folder}/${file}: \n\n${text}\n---------------------\n`
//         );
//         // const dateExtractor = new DatePatternExtractor();
//         // const transaction = new TransactionExtractor(dateExtractor, text);
//         // console.log(transaction.toJson());
//       }
//     }
//   }
// });
const paragraphs = `
1+2  1+4  1+5
`;
const p1 = /(\+)/g;
const p2 = /\+/g;
const p3 = /(?<=\+)/g;
const p4 = /(?=\+)/g;
const p5 = /(?:\+)/g;
console.log(paragraphs.split(p1));
console.log(paragraphs.split(p2));
console.log(paragraphs.split(p3));
console.log(paragraphs.split(p4));
console.log(paragraphs.split(p5));
