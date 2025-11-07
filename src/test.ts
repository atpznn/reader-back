import { getInvestmentJsonFormImage } from "./ocr/invest_dime_slip/index.js"
import fs from 'fs'
import { getDividendJsonFormImage } from "./ocr/dividend_dime_screen_shot/index.js"

async function testInvestmentImage() {
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
    const imageFiles = await Promise.all(images.map(x => fs.readFileSync(x)))
    const jsons = imageFiles.map(x => getInvestmentJsonFormImage(Buffer.from(x.buffer)))
    return jsons
}

async function testDividendImage() {
    const images = [
        './pic/1000001054.jpg',
        './pic/1000001055.jpg',
    ]
    const imageFiles = await Promise.all(images.map(x => fs.readFileSync(x)))
    const jsons = imageFiles.map(x => getDividendJsonFormImage(Buffer.from(x.buffer)))
    return jsons
}
await testInvestmentImage()
await testDividendImage()