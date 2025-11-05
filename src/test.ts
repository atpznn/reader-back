import { createAInvestmentLog } from "./investment/index.js"
import tesseract from "node-tesseract-ocr"
const config = {
    lang: "eng",
    oem: 1,
    psm: 11,
}
function test1(imagepath: string) {
    return tesseract.recognize(imagepath, config)
        .then(text => {
            return createAInvestmentLog(text)
        })
        .catch(error => {
            throw error
        })
}
const images = [
    './pic/1000000972.jpg',
    './pic/1000000973.jpg',
    './pic/1000000974.jpg',
    './pic/1000000975.jpg',
    './pic/1000000976.jpg',

    './pic/1000000977.jpg',
    './pic/1000000978.jpg',
    './pic/1000000980.jpg',
]
const result = [
    ...images.map(x => test1(x)),
]
console.log((await Promise.all(result)).map(x => JSON.stringify(x.toJson())).join('\n\n'))