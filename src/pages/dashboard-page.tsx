import { Col, Container, Row, ListGroup } from 'react-bootstrap';
import Nav from "../components/nav"
import TransactionView from '../components/transaction-view';
import WalletCard from '../components/wallet-card';
import { useState } from 'react';
import { SendMoneyModal } from '../components/send-money-modal';
import { TopUpWalletModal } from '../components/top-up-wallet-modal';
import { AuthService } from '../services/auth.service';
import { useHistory } from 'react-router';

export interface DashboardProps {}

const DashboardPage: React.FC<DashboardProps> = () => {
    const [showModal, setShowModal] = useState(false);
    const [showTopUpModal, setShowTopUpModal] = useState(false);
    const history = useHistory();

    const handleSendMoneyModalClose = () => {
        setShowModal(false);
    }
    const handleTopUpModalClose = () => {
        setShowTopUpModal(false);
    }
    const handleLogout = () => {
        AuthService.logout();
        history.push('/');
    }

    return (
    <>
        <Container>
            <Nav />
            <Row>
                <Col xs="12" md="3">
                    <ListGroup defaultActiveKey="#link1">
                        <ListGroup.Item action href="#link1" onClick={() => setShowModal(true)}>Send Money </ListGroup.Item>
                        <ListGroup.Item action href="#link2" onClick={() => setShowTopUpModal(true)}>Top Wallet up </ListGroup.Item>
                        <ListGroup.Item action href="#link3" onClick={() => handleLogout()}>Logout</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col xs="12" md="9">
                    <Row className="justify-content-md-end mb-3">
                        <Col xs="12" lg="5">
                            <WalletCard />
                        </Col>
                    </Row>
                    
                    <TransactionView />
                    <div className="py-5"></div>
                </Col>
            </Row>
            <SendMoneyModal handleClose={handleSendMoneyModalClose} showModal={showModal} />
            <TopUpWalletModal handleClose={handleTopUpModalClose} showModal={showTopUpModal}/>
        </Container>


    </>)
}


export default DashboardPage;