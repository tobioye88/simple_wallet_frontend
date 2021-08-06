import { Wallet } from './wallet';

export interface Transaction {
  id: number;
  user_id: number;
  wallet_id: number;
  transaction_id: string;
  type: TransactionType;
  amount: number;
  currency: string;
  created_at: string;
  remarks?: string;

  wallet?: Wallet;
}

export enum TransactionType {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}
