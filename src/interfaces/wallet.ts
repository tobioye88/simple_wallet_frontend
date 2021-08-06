import { User } from './user';

export interface Wallet {
    id: number;
    user_id: number;
    address: string;
    balance: number;
    currency: string;
    created_at: string;

    user?: User;
}