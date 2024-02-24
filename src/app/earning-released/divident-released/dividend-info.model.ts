// dividend-info.model.ts

export interface DividendInfo {
    adjDividend: number;
    date: string;
    declarationDate: string | null;
    dividend: number;
    label: string;
    paymentDate: string;
    recordDate: string;
    symbol: string;
  }
  