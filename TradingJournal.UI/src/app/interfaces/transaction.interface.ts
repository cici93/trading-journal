import { AssetType } from "../types/asset.type";
import { TransactionType } from "../types/transaction.type";


export interface Transaction {
    transactionId?: number;
    label?: string;
    transactionPrice?: number;
    transactionType?: TransactionType;
    transactionDate?: Date;
    quantity?: number;
    total?: number;
    commission?: number;
    tax?: number;
    currency?: string;
    notes?: string;
}