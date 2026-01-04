import { extractDateFromText } from "../../../util";
import type { Dividend } from "../dividend/dividend";
import type { Parser } from "../parser";
export class TAFLog implements Parser<Dividend> {
  constructor(private text: string) {}
  save(): void {}
  toJson(): Dividend {
    const texts = this.text.split(" ");
    const amount = parseFloat(texts[2]!);
    const date = extractDateFromText(this.text);
    return {
      type: "Tax",
      symbol: "-",
      remark: "TAF Fee deducted from Dime account",
      completionDate: date,
      amount: amount,
    };
  }
}
