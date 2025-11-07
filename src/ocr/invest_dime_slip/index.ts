import tesseract from "node-tesseract-ocr"
import { createAInvestmentLog } from "./core.js"
const config = {
    lang: "eng",
    oem: 1,
    psm: 11,
}
export async function getInvestmentJsonFormImage(image: Buffer) {
    return await tesseract.recognize(image, config)
        .then(text => {
            return createAInvestmentLog(text).toJson()
        })
        .catch(error => {
            throw error
        })
}