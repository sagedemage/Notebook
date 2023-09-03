/* Navigation Bar */
import { Container, NavDropdown } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'
import { Logout } from '../auth/logout'

export default function NavigationBar({isAuth}) {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="/">Notebook</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                        </Nav>
                        {/* Non Auth Links */}
                        {isAuth === false &&
                            <Nav className='ms-auto'>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
                            </Nav>
                        }
                        {/* Auth Links */}
                        { isAuth === true &&
                            <Nav className='ms-auto'>
                                <NavDropdown id="nav-dropdown" title="Account" menuVariant="dark">
                                    <NavDropdown.Item href="/dashboard">Notes</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => Logout()}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}