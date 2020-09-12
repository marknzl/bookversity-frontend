import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams, useHistory} from "react-router-dom";

import AuthService from '../services/AuthService';
import IItem from '../shared/IItem';
import CartService from '../services/CartService';

function ViewItem() {
    let { id } = useParams();
    let history = useHistory();

    useEffect(() => {
        fetchItem();
    }, []);

    const [item, setItem] = useState<IItem>({
        loading: true,
        error: false,
        data: null
    });

    const fetchItem = async () => {
        const itm = await fetch(`https://bookversity-backend.azurewebsites.net/api/Item/GetItem?id=${id}`);
        const it = await itm.json();

        setItem({
            loading: false,
            data: it,
            error: false
        });
    };

    const addToCart = (e: any) => {
        CartService.addToCart(item.data.id).then((res) => {
            history.push('/cart')
        });
    }

    if (item.loading) {
        return (
            <div>
                <h4>Loading...</h4>
            </div>
        )
    } else {
        let button = <button id={item.data.id} className="btn btn-success btn-lg btn-block" onClick={addToCart}>Add to cart</button>

        if (AuthService.isLoggedIn()) {
            if (item.data.sellerId == AuthService.getUserId()) {
                button = <button id={item.data.id} disabled className="btn btn-success btn-lg btn-block">This is your listing</button>
            }
        } else {
            button = <button id={item.data.id} className="btn btn-success btn-lg btn-block" disabled>Login to add cart</button>
        }

        return (
            <Container>
                <Row>
                    <Col>
                        <div className="card mt-5">
                            <h5 className="card-header">
                                Item details: Listing ID #{item.data.id}
                            </h5>
                            <div className="card-body">
                                <div className="col-sm-4 mt-3 mb-3 mx-auto">
                                    <div className="card">
                                        <img className="card-img-top" src={item.data.itemImageUrl}></img>
                                        <div className="card-body">
                                            <h5 className="card-title">{item.data.itemName}</h5>
                                            <p className="card-text">Price: ${item.data.price}</p>
                                            <p className="card-text"><strong>Description:</strong> {item.data.itemDescription}</p>
                                            <p className="card-text"><small className="text-muted">Created: {new Date(Date.parse(item.data.timeCreated)).toLocaleDateString("en-us")}</small></p>
                                            {/* <button id={item.data.id} className="btn btn-success btn-lg btn-block" onClick={addToCart}>Add to cart</button> */}
                                            {button}
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
}

export default ViewItem;