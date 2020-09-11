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
                    <div className="card mt-5">
                        <h5 className="card-header">Sell a new item</h5>
                        <div className="card-body">
                        <form className="mt-3">
                            <div className="form-group">
                                <label>Item Name</label>
                                <input type="text" className="form-control" required></input>
                            </div>
                            <div className="form-group">
                                <label>Description (Max 150 characters)</label>
                                <textarea className="form-control" rows={3} maxLength={150} required></textarea>
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input type="number" inputMode="numeric" pattern="[0-9]*" className="form-control" min="0.00" required></input>
                            </div>
                            <div className="form-group">
                                <label>Upload your image:</label><br></br>
                                <input type="file" accept="image/*"></input>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg btn-block">Sell!</button>
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