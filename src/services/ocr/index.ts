import tesseract from "node-tesseract-ocr";
import fs from "fs";
const config = {
  lang: "eng+tha",
  oem: 1,
  psm: 6,
};
export async function readImageBufferFromPath(path: string) {
  const image = await fs.readFileSync(path);
  const imageBuffer = Buffer.from(image.buffer);
  return imageBuffer;
}
function sanitize(text: string): string {
  return text.replace(/([ก-์])\s+(?=[ก-์])/g, "$1").replace(/\s+/g, " ");
}
export async function parseImageToText(image: Buffer) {
  return await tesseract
    .recognize(image, config)
    .then((text) => {
      return sanitize(text)
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "")
        .join(" ");
    })
    .catch((error) => {
      throw error;
    });
}
