import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Nav from "../components/nav";

export interface DashboardProps {}

const NotFoundPage: React.FC<DashboardProps> = () => {
    return (
        <Container>
             <Nav />
            <Row className="justify-content-md-center mt-5">
                <Col>
                    <div className="text-center text-muted" style={{fontSize: 300}}>404</div>
                    <div className="text-center lead text-muted">Oops... Page not found</div>
                    <div className="text-center lead text-muted"><Link to="/">Go Home</Link></div>
                </Col>
            </Row>
        </Container>
    )
}


export default NotFoundPage;