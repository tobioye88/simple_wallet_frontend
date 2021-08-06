import { Card } from 'react-bootstrap';
import { Transaction, TransactionType } from '../interfaces/transaction';
import { FormatMoney } from '../services/format-money';

export interface TransactionProps {
    transaction: Transaction
}

const TransactionSingle: React.FC<TransactionProps> = ({ transaction }) => {
    let className = "text-end ";
    className += transaction.type === TransactionType.CREDIT? "text-success" : "text-danger";
    return (
        <Card
            bg="white"
            text="dark"
            className="border-0 shadow-sm mb-2"
        >
            <Card.Body>
            {/* <Card.Title><span>From:</span> Tobi Oyelami</Card.Title> */}
            <Card.Text className={className} style={{fontSize: 30}}>
                {transaction.type === TransactionType.DEBIT? "-": ""}
                {FormatMoney.currency(transaction.amount)}
            </Card.Text>
            <div className="text-muted"><small>TRANSACTION ID:</small></div> 
            <Card.Text className="">{transaction.transaction_id}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default TransactionSingle;