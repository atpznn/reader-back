import { createAInvestmentLog } from "./investment/index.js"
import tesseract from "node-tesseract-ocr"
const config = {
    lang: "eng",
    oem: 1,
    psm: 11,
}
export async function getJsonFormImage(image: Buffer) {
    return await tesseract.recognize(image, config)
        .then(text => {
            return createAInvestmentLog(text).toJson()
        })
        .catch(error => {
            throw error
        })
}