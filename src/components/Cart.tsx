import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AuthService from '../services/AuthService';

function Cart() {
    if (!AuthService.isLoggedIn()) {
        return (
            <div>
                Please login!
            </div>
        )
    } else {
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