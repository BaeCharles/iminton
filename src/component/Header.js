import React from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Header = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" sticky="top">
                <Navbar.Brand as={Link} to='/'>아이민턴</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to='/member' className='nav-link active'>출석</Link>
                        <Link to='/member' className='nav-link'>회원</Link>
                        <Link to='/member' className='nav-link'>통계</Link>
                        <Link to='/member' className='nav-link'>출석</Link>
                        {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to='/join'>회원가입</Nav.Link>
                        <Nav.Link as={Link} to='/login'>로그인</Nav.Link>
                        {/* <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>  
            </Navbar>
        </>
    );
};

export default Header;