import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Nav from "../components/nav";
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { AlertService } from "../services/alert.service";
import { AuthService } from '../services/auth.service';
import { Registration } from "../interfaces/registration";

export interface DashboardProps {}

const RegistrationPage: React.FC<DashboardProps> = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDOB] = useState("");
    const [bvn, setBVN] = useState("");

    const handleBvn = (bvn: string): void => {
        setBVN(bvn.replace(/[^0-9]/ig, ""));
    }


    const handleSubmit = async (): Promise<void> => {
        setIsLoading(true);
        const data = {
            email,
            first_name,
            last_name,
            password,
            dob,
            bvn
        } as Registration;

        try{
            AuthService.register(data)
            AlertService.success("Registration Successful");
            history.push("/");
        } catch(e){
            setIsLoading(false);
            console.log(e);
        }
        
    }

    return (
        <Container>
            <Nav />

            <Card className="border-0 mb-5">
                <Row className="justify-content-md-center">
                    <Col xs lg={12}>
                        <Card.Title className="p-3">Register with us</Card.Title>
                    </Col>
                    <Col>
                        <div className="p-4">
                            <p className="lead">Why you should join us.</p>
                            <ul>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li> Vivamus vel odio venenatis, luctus quam ultrices, malesuada est. </li>
                                <li> Aliquam malesuada diam ut dui pulvinar pharetra eu et arcu. </li>
                                <li>Morbi aliquet sapien faucibus interdum sagittis.</li>
                            </ul>
                        </div>
                    </Col>
                    <Col>
                        <Card.Body>
                            <Row className="mb-3">
                                <Col xs={6}>
                                    <Form.Group controlId="firstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control size="lg" type="text" name="first_name" required placeholder="John" onChange={(e) => setFirstName(e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group controlId="lastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control size="lg" type="text" name="last_name" required placeholder="Doe" onChange={(e) => setLastName(e.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3" controlId="emailAddress">
                                <Form.Label>Email</Form.Label>
                                <Form.Control size="lg" type="email" name="email" required placeholder="example@mail.com" onChange={(e) => setEmail(e.target.value)} />
                                <Form.Text className="text-muted"> We'll never share your email with anyone else.</Form.Text>
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Row>
                                    <Col xs={10}>
                                        <Form.Control size="lg" name="password" required type={showPassword? 'text' : 'password'} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                    </Col>
                                    <Col xs={2}>
                                        <Button 
                                            onClick={ () => setShowPassword(!showPassword) } 
                                            size="lg" variant="outline-primary" type="submit"> {!showPassword ? "Show" : "Hide"}</Button>
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="dob">
                                <Form.Label>DOB</Form.Label>
                                <Form.Control size="lg" name="dob" required type="date" placeholder="DOB" onChange={(e) => setDOB(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="bvn">
                                <Form.Label>BVN</Form.Label>
                                <Form.Control size="lg" required value={bvn} type="text" placeholder="BVN" onChange={(e) => handleBvn(e.target.value)} />
                            </Form.Group>

                            <Button 
                                disabled={isLoading}
                                onClick={ handleSubmit } 
                                size="lg" variant="primary" type="submit"> Register</Button>
                            <span className="px-3">Already a member? <Link to="/">Login</Link> </span>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}


export default RegistrationPage;