import type { Dividend, IDividend } from "./core.js"


export class TaxDividendLog implements IDividend {
    constructor(private words: string[]) { }
    toJson(): Dividend {
        throw new Error('implemnt')
    }
}
