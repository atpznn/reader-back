import { cleanText, filterEmptyWord } from "../../util";
import type { Transaction } from "../transaction/transaction";
import { BuyInvestmentLog } from "./buyInvestment";
import { SellInvestmentLog } from "./sellInvestment";
import { getType } from "./util";

export type InvestmentType = "Sell" | "Buy";
export interface Vat {
  commissionFee: number;
  vat7: number | null;
  secFee: number | null;
  tafFee: number | null;
}
export interface Investment extends Transaction {
  symbol: string;
  type: InvestmentType;
  shares: number;
  vat: Vat;
  allVatPrice: number;
  vatExecuted: number;
  diffVat: number;
  submissionDate: Date | null;
  executedPrice: number;
  stockAmount: number;
  value: number;
}
export function createAInvestmentLog(word: string): IInvestmentLog {
  const words = filterEmptyWord(cleanText(word).split("\n"));
  const type = getType(words) as InvestmentType;
  switch (type) {
    case "Sell":
      return new SellInvestmentLog(words);
    case "Buy":
      return new BuyInvestmentLog(words);
    default:
      throw Error("no type");
  }
}
export interface IInvestmentLog {
  toJson(): Investment;
}
