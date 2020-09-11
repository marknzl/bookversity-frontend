import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AuthService from '../services/AuthService';

interface ICartItems {
    loading: boolean;
    data: any;
    error: boolean;
}

function Cart() {
    const [cartItems, setCartItems] = useState<ICartItems>({
        loading: true,
        data: null,
        error: false
    });

    const fetchCartItems = async () => {
        const cItems = await fetch("https://bookversity-backend.azurewebsites.net/api/Cart/MyCart", {
            headers: {
                'Authorization': `${AuthService.getAuthHeader().Authorization}`
            },
        });
    };

    if (!AuthService.isLoggedIn()) {
        return (
            <div>
                Please login!
            </div>
        )
    } else {
        fetchCartItems();

        return (
            <Container>
                <Row>
                    <Col>
                        <div className="card mt-5">
                            <h5 className="card-header">Your Cart:</h5>
                            <div className="card-body">
                                
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Cart;