import { cleanText, filterEmptyWord } from "../util.js"
import { IncomeDividendLog } from "./incomeDividend.js"
import { TaxDividendLog } from "./taxDividend.js"

export type DividentType = "Tax" | "Income"
export interface Dividend {
    symbol: string
    amount: number
    date: Date | null
    type: Dividend
}
export function createADividendLog(word: string): IDividend {
    const words = filterEmptyWord(cleanText(word).split('\n'))
    const type = words[1] as DividentType
    switch (type) {
        case "Income": return new IncomeDividendLog(words)
        case "Tax": return new TaxDividendLog(words)
        default: throw Error('no type')
    }
}
export interface IDividend {
    toJson(): Dividend
} 