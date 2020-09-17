import React from 'react';
import IYourCartProps from '../../types/Props/IYourCartProps';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function YourCart(props: IYourCartProps) {
    return (
        <Container>
            <Row>
                <Col>
                    <div className="card mt-5 border-dark">
                        <h5 className="card-header bg-dark text-white">Your Cart:</h5>
                        <div className="card-body">
                            <div className="container">
                                <div className="row">
                                    {props.items}
                                </div>
                            </div>
                            <hr />
                            <div className="mt-3">
                                <h5>Total: ${props.total}</h5>
                                {props.purchaseButton}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default YourCart;