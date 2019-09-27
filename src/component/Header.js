import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const Header = () => {
    const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));
    const isAuth = (/(login|join)/).test(window.location.pathname);

    const logout = (event) => {
        event.preventDefault();
        localStorage.removeItem('isLogin');
        setIsLogin(false);
    }

    return (
        <>
            {!isLogin && !isAuth && <Redirect to="/login" />}
            {isLogin && isAuth && <Redirect to="/" />}
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" sticky="top">
                <Navbar.Brand as={Link} to='/'>아이민턴</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                {isLogin && (
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to='/attendance' className='nav-link active'>출석</Link>
                            <Link to='/member' className='nav-link'>회원</Link>
                            <Link to='/member' className='nav-link'>통계</Link>
                            {/* <Link to='/member' className='nav-link'>회계</Link> */}
                            <NavDropdown title="회계" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">일별</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">월별</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">년별</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to='/user'>정보수정</Nav.Link>
                            {/* <Nav.Link as={Link} to='/join'>회원가입</Nav.Link> */}
                            <Nav.Link onClick={logout}>로그아웃</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>)
                }
            </Navbar>
        </>
    );
};

export default Header;