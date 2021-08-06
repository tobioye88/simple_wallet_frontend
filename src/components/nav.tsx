import { Navbar, Container } from "react-bootstrap";

export interface NavProps {}

const Nav: React.FC<NavProps> = () => {
    return (
        <Navbar className="mt-3 rounded shadow-sm mb-5" expand="lg" variant="light" bg="white">
            <Container>
                <Navbar.Brand href="/">Wallet.io</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Nav;