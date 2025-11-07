import type { Dividend, IDividend } from "./core.js";


export class IncomeDividendLog implements IDividend {
    constructor(private words: string[]) { }
    toJson(): Dividend {
        throw new Error('implemnt')
    }
}
