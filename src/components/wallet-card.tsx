import { Card } from 'react-bootstrap';
import { Wallet } from '../interfaces/wallet';
import { useState, useEffect } from 'react';
import { FormatMoney } from '../services/format-money';
import HttpClient from '../services/http-client';
import { AxiosResponse } from 'axios';
import { ResponseWrapper } from '../interfaces/response-wrapper';
import { useLocation } from 'react-router';

export interface WalletCardProps {
}

const sampleWallet = {
    user: {
        first_name: "",
        last_name: "",
    },
    balance: 0,
    address: ""
} as Wallet;

const WalletCard: React.FC<WalletCardProps> = () => {
    const [wallet, setWallet] = useState(sampleWallet);
    const location = useLocation();

    useEffect(() => {
        // make api call
        (async () => {
            try{
                const response = await HttpClient.get<AxiosResponse<ResponseWrapper<Wallet>>>('/balance');
                console.log(response.data.data)
                setWallet(response.data.data);
            }catch (e) {
                console.log(e);
            }
        })();
    }, [location]);
    return (
        <Card
            bg="primary"
            text="light"
            className="mb-2"
        >
            <Card.Body>
            <Card.Title>{wallet.user?.first_name} {wallet.user?.last_name}</Card.Title>
            <div className="text-end"><small>Balance</small></div>
            <Card.Text className="display-5 text-end">{FormatMoney.currency(wallet.balance)}</Card.Text>
            <div className=""><small>Wallet Address</small></div>
            <Card.Text className="text-uppercase">{wallet.address}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default WalletCard;