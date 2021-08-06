import { Button, Modal, Form } from "react-bootstrap";
import { useState } from 'react';
import HttpClient from "../services/http-client";
import { AxiosResponse } from 'axios';
import { ResponseWrapper } from '../interfaces/response-wrapper';
import { Transaction } from "../interfaces/transaction";

export interface SendMoneyModalProps {
    showModal: boolean;
    handleClose: () => void;
}

export const SendMoneyModal: React.FC<SendMoneyModalProps> = ({ showModal, handleClose }) => {
    const [amount, setAmount] = useState<number | null>(null);
    const [walletAddress, setWalletAddress] = useState("");
  
    const handleWalletAddress = (walletAddress: string) => {
        walletAddress.replace(" ", "");
        setWalletAddress(walletAddress);
    }

    const handleAmount = (amount: number) => {
        if(amount < 1000){
            amount = 1000;
        }
        setAmount(amount);
    };

    const handleSubmit = async () => {
        const data = {
            wallet: walletAddress,
            amount: amount
        }
        console.log(data);
        const response = await HttpClient.post<AxiosResponse<ResponseWrapper<Transaction>>>('/wallet/send', data);
        console.log(response);
        handleClose();
    }
  
    return (
      <>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton className="border-0">
            <Modal.Title>Send Money</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Wallet Address</Form.Label>
                <Form.Control size="lg" type="text" placeholder="" onChange={(e) => handleWalletAddress(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Amount</Form.Label>
                <Form.Control size="lg" type="number" value={amount || ''} placeholder="1000" min="0" onChange={(e) => handleAmount(+e.target.value)} />
                <Form.Text><small>Minimum of 1000</small></Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button variant="outline-secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Send
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  