import { SymbolDto } from "./symbol-dto";
import { HistoricalBarDto } from "./historical-bar-dto";

export interface StockDataDto {
    ticker?: string;
    companyName?: string;
    price?: number;
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
    historicalBars?: HistoricalBarDto[];
}