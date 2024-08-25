import { SymbolDto } from "./symbol-dto";
import { HistoricalBarDto } from "./historical-bar-dto";

export interface StockDataDto {
    ticker?: string;
    companyName?: string;
    price?: {
        value: number,
        currency: string,
        lastUpdated: Date
    }
    change?: number;
    changePercent?: number;
    volume?: number;
    avgVolume?: number;
    marketCap?: number;
    peRatio?: number;
    week52High?: number;
    week52Low?: number;
    ytdChange?: number;
    lastUpdated?: string;
    stockLogo?: {
        name: string,
        ticker: string,
        image: string,
    };
    historicalBars?: HistoricalBarDto[];
}