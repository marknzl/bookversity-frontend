import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import IItem from '../../shared/IItem';
import IViewItemCardProps from '../../types/Props/IViewItemCardProps';

function ViewItemCard(props: IViewItemCardProps) {
    let item: IItem = props.item;

    return (
        <Container>
            <Row>
                <Col>
                    <div className="card mt-3 mb-5 border-dark">
                        <h5 className="card-header bg-dark text-white">
                            Item details: Listing ID #{item.id}
                        </h5>
                        <div className="card-body">
                            <div className="col-sm-4 mt-3 mb-3 mx-auto">
                                <div className="card">
                                    <img className="card-img-top" src={item.itemImageUrl}></img>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.itemName}</h5>
                                        <p className="card-text">Price: ${item.price}</p>
                                        <p className="card-text"><strong>Description:</strong> {item.itemDescription}</p>
                                        <p className="card-text"><small className="text-muted">Created: {new Date(Date.parse(item.timeCreated)).toLocaleDateString("en-us")}</small></p>
                                        {/* <button id={item.data.id} className="btn btn-success btn-lg btn-block" onClick={addToCart}>Add to cart</button> */}
                                        {props.button}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ViewItemCard;