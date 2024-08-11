import { TransactionType } from "../types/transaction.type";

export interface Transaction {
    transactionId?: number;
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