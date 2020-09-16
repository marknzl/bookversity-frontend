import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, useHistory } from 'react-router-dom';

import AuthService from '../services/AuthService';
import INavbarProps from '../types/Props/INavbarProps';

function MyNavbar(props: INavbarProps) {
    let history = useHistory();

    const logout = () => {
        AuthService.logout();
        props.setLoggedInStatus(false);
        history.push('/');
    }

    const navigate = (e: any) => {
        e.preventDefault();
        history.push('/');
    };

    if (!props.loggedIn) {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand onClick={navigate}>
                    <img
                            alt=""
                            src="testlogo.png"
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
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
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
                    <Navbar.Brand onClick={navigate}>
                    <img
                            alt=""
                            src="testlogo.png"
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
                        <Nav.Link as={Link} to="/sellitem">Sell item +</Nav.Link>
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