import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import AuthService from '../services/AuthService';

function MyNavbar() {
    let token = localStorage.getItem("jwt");

    const logout = () => {
        AuthService.logout();
        window.location.href = '/';
    }

    if (token === null) {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/">
                    <img
                            alt=""
                            src="logo192.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Bookversity
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {/* <Nav.Link as={Link} to="/cart">Cart ({cartCount})</Nav.Link>
                        <Nav.Link as={Link} to="/myaccount">My Account</Nav.Link>
                        <Nav.Link as={Link} to="/sellitem">Sell item</Nav.Link> */}
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    } else {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/">
                    <img
                            alt=""
                            src="logo192.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Bookversity
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/cart">View Cart</Nav.Link>
                        <Nav.Link as={Link} to="/myaccount">My Account</Nav.Link>
                        <Nav.Link as={Link} to="/sellitem">Sell item</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default MyNavbar;