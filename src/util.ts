import type { Vat } from "./investment/index.js"

export function filterEmptyWord(words: string[]) {
    return words.filter(w => w != '')
}

export function isSellType(word: string) {
    return word.includes('Sell')
}
export function defaultZero(value: number | null) {
    return (value || 0)
}
export function isBuyType(word: string) {
    return word.includes('Buy')
}
export function findSame(words: string[], search: string) {
    return words.filter(x => x.includes(search))
}
export function sumVat(vat: Vat) {
    const allVatPrice = (defaultZero(vat.commissionFee) + defaultZero(vat.secFee) + defaultZero(vat.tafFee) + defaultZero(vat.vat7))
    return allVatPrice
}
export function parseWithWord(word: string, search: string) {
    return parseFloat(word?.replace(search, ''))
}
export function parseUsd(word: string) {
    return parseWithWord(word, 'USD')
}
export function findWord(words: string[], search: string) {
    return words.find(f => f.includes(search))
}
export function findWordUseNextLine(words: string[], search: string) {
    const index = words.findIndex(f => f.includes(search))
    const word = words[index + 1]
    return word
}
export function hasShares(word: string) {
    return word.includes('Shares')
}
export function getShares(word: string) {
    if (hasShares(word)) return parseFloat(word.replace('Shares', ''))
    return 0.00
}
export function getDate(word: string) {
    return new Date(word.replace('Completion date', '').split('-')[0]!)
}

export function cleanText(word: string) {
    return word.replaceAll('\r', '')
}
export function extractDatesFromText(words: string[]) {
    const dateRegex = /\b(\d{2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{4})\s/g
    const matches = words.filter(w => w.match(dateRegex));
    if (matches) {
        return matches;
    }
    return [];
}
export function parseDateTimeToDateObject(dateTimeString: string) {
    const standardFormat = dateTimeString.replace(' - ', ' ');
    const date = new Date(standardFormat);
    if (!isNaN(date.getTime())) {
        return date;
    }
    return null;
}
export function getSymbol(words: string[]) {
    const index = words.findIndex(w => isSellType(w) || isBuyType(w))
    if (index == -1) return "-"
    const type = getType(words)
    const thisWordHasSymbol = words[index]
    const thisSymbolHere = (thisWordHasSymbol?.split(type)[1]!).split(' ')[1]
    return thisSymbolHere
}
export function displayDateToLocal(date: Date) {
    return date.toLocaleString()
}
export function getType(words: string[]) {
    const index = words.findIndex(w => isSellType(w) || isBuyType(w))
    if (index == -1) return "-"
    if (isSellType(words[index]!)) {
        return "Sell"
    }
    else if (isBuyType(words[index]!)) {
        return "Buy"
    }
    return "-"
}