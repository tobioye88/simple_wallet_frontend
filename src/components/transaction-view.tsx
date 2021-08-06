import { useState, useEffect } from 'react';
import { Transaction } from '../interfaces/transaction';
import HttpClient from '../services/http-client';
import TransactionSingle from './transaction-single';
import { AxiosResponse } from 'axios';
import { ResponseWrapper } from '../interfaces/response-wrapper';
import { useLocation } from 'react-router';

export interface NavProps {}

const sampleTransaction = [
] as Transaction[];

const TransactionView: React.FC<NavProps> = () => {
    // get list of transactions
    const [transactions, setTransactions] = useState(sampleTransaction);
    const location = useLocation()

    const getTransactions = async (): Promise<void> => {   
        try{
            const response = await HttpClient.get<AxiosResponse<ResponseWrapper<Transaction[]>>>('/transactions');
            setTransactions(response.data.data);
        }catch(e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getTransactions();
    }, [location]);


    return (
        <>
             {transactions.length > 0? (<div className="mb-3">Transactions</div>):''}
            {transactions.map((transaction, i) => <TransactionSingle transaction={transaction} key={i} />)}
            {transactions.length > 0? (<div className="my-5">Pagination</div>): ''}
        </>
    )
}

export default TransactionView;