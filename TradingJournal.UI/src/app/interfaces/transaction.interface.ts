import { AssetType } from "../types/asset.type";
import { TransactionType } from "../types/transaction.type";


export interface TransactionDto {
    transactionId?: number;
    assetType?: AssetType;
    label?: string;
    transactionPrice?: number;
    transactionType?: TransactionType;
    transactionDate?: Date;
    quantity?: number;
    commission?: number;
    tax?: number;
    currency?: string;
    notes?: string;
}