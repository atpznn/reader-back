import { defaultZero } from "../../util.js";
import type { Vat } from "./core.js";

export function isSellType(word: string) {
  return word.includes("Sell");
}

export function isBuyType(word: string) {
  return word.includes("Buy");
}

export function sumVat(vat: Vat) {
  const allVatPrice =
    defaultZero(vat.commissionFee) +
    defaultZero(vat.secFee) +
    defaultZero(vat.tafFee) +
    defaultZero(vat.vat7);
  return allVatPrice;
}
export function hasShares(word: string) {
  return word.includes("Shares");
}
export function getShares(word: string) {
  if (hasShares(word)) return parseFloat(word.replace("Shares", ""));
  return 0.0;
}

export function getSymbol(words: string[]) {
  const index = words.findIndex((w) => isSellType(w) || isBuyType(w));
  if (index == -1) return "-";
  const type = getType(words);
  const thisWordHasSymbol = words[index];
  const thisSymbolHere = thisWordHasSymbol?.split(type)[1]!.split(" ")[1];
  return thisSymbolHere;
}

export function getType(words: string[]) {
  const index = words.findIndex((w) => isSellType(w) || isBuyType(w));
  if (index == -1) return "-";
  if (isSellType(words[index]!)) {
    return "Sell";
  } else if (isBuyType(words[index]!)) {
    return "Buy";
  }
  return "-";
}
class Text {
  constructor(private text: string) {}
  haveKeywords(keywords: string[]) {
    return keywords.some((keyword) => this.text.includes(keyword));
  }
}
["stock symbol"];
