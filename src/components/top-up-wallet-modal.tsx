import { Button, Modal, Form } from "react-bootstrap";
import { useState } from 'react';
import HttpClient from "../services/http-client";
import { AxiosResponse } from 'axios';
import { ResponseWrapper } from '../interfaces/response-wrapper';
import { Transaction } from '../interfaces/transaction';

export interface TopUpWalletModalProps {
    showModal: boolean;
    handleClose: () => void;
}

export const TopUpWalletModal: React.FC<TopUpWalletModalProps> = ({ showModal, handleClose }) => {
    const [amount, setAmount] = useState<number | null>(null);
  
    const handleAmount = (amount: number) => {
        if(amount < 0){
            amount = amount * -1;
        }
        setAmount(amount);
    };

    const handleSubmit = async () => {
        const data = {
            amount: amount
        }
        handleClose();
        try{
          await HttpClient.post<AxiosResponse<ResponseWrapper<Transaction>>>('/wallet/add', data);
        }catch (e){
          console.log(e);
        }
    }
  
    return (
      <>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton className="border-0">
            <Modal.Title>Top Up Wallet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-muted mb-3">Add Payment gateway here</div>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Amount</Form.Label>
                <Form.Control size="lg" type="number" value={amount || ''} placeholder="1000" min="0" onChange={(e) => handleAmount(+e.target.value)} />
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
  