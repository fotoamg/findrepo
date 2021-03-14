import { Navbar, Nav, Dropdown, DropdownButton, Col, Row, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

/**
 * Component for navigation menus
 * @param {*} props 
 */
function StickyNavbar(props) {
    return <Navbar bg="primary" variant="dark" sticky="top" >
        <Navbar.Brand>Repo Search App</Navbar.Brand>
        <Nav className="mr-auto navbarOuter">
            <Container fluid className="horNavContainer">
                <Row className="horNavRow">
                    <Col className="horNavLinkCol">
                        <LinkContainer to="/search">
                            <Nav.Link className="horNav">Search</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/history">
                            <Nav.Link className="horNav">History</Nav.Link>
                        </LinkContainer>
                    </Col>
                    <Col className="vertNavDropCol">
                        <Dropdown>
                            <DropdownButton
                                
                                key="vertMenu"
                                id={`dropdown-button-drop-vert`}
                                drop="left"
                                title=" " >
                                <Dropdown.Item>
                                    <LinkContainer to="/page1">
                                        <Nav.Link className="vertNav">Page 1</Nav.Link>
                                    </LinkContainer>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <LinkContainer to="/page2">
                                        <Nav.Link className="vertNav">Page 2</Nav.Link>
                                    </LinkContainer>
                                </Dropdown.Item>
                            </DropdownButton>
                        </Dropdown>
                    </Col>
                </Row>
            </Container>
        </Nav>
    </Navbar>
}

export default StickyNavbar;
