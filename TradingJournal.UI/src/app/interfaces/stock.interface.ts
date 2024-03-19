import {TransactionDto} from "./transaction.interface";

export interface Stock {
  name?: string;
  symbol?: string;
  figi?: string;
  price?: number;
  transactions?: TransactionDto[];
  sector?: string;
  country?: string;
  indices?: string;
  total?: number;
  quantity?:number;
}
