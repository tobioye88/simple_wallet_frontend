import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Nav from "../components/nav";
import { AuthService } from '../services/auth.service';
import { Link, useHistory } from 'react-router-dom';
import { AlertService } from '../services/alert.service';

export interface LoginProps {}

const LoginPage: React.FC<LoginProps> = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(()=> {
        if(localStorage.getItem('token')){
            history.push('/dashboard');
        }
    });
    
    const handleClick = async (): Promise<void> => {
        setLoading(true);
        try{
            console.log('username', username, 'password', password);
            await AuthService.login(username, password);
            history.push('/dashboard');
        } catch(e){
            setLoading(false);
            const message = e.message || "Unknown error";
            AlertService.error(message);
        }
    }

    return (
        <Container>
            <Nav />
            <Row className="justify-content-md-end mt-5">
                <Col xs lg="4">
                    <Card className="border-0">
                        <Card.Body>
                            <Card.Title className="py-3">Login</Card.Title>
                            <form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control size="lg" autoComplete="off" type="text" placeholder="example@mail.com" onChange={(e) => setUsername(e.target.value)} />
                                </Form.Group>
                                
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control size="lg" autoComplete="off" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>

                                <Button 
                                    disabled={isLoading}
                                    onClick={ handleClick } 
                                    size="lg" variant="primary" type="submit"> Login</Button>
                                <span className="px-3">
                                    New? <Link to="/register">Join us</Link>
                                </span>
                            </form>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}


export default LoginPage;