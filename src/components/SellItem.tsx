import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SellItem() {
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                    <div className="card mt-3">
                        <h5 className="card-header">Sell a new item</h5>
                        <div className="card-body">
                        <form className="mt-3">
                            <div className="form-group">
                                <label>Item Name</label>
                                <input type="email" className="form-control" required></input>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="form-control" required></textarea>
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input type="number" className="form-control" min="0.00" required></input>
                            </div>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" accept="image/*"></input>
                                <label className="custom-file-label">Choose file</label>
                            </div>
                        </form>
                        </div>
                    </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SellItem;