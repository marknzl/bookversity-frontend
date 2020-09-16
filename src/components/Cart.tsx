import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from 'axios';

import { useHistory } from 'react-router-dom';

import AuthService from '../services/AuthService';
import ICartResponse from '../types/Response Types/ICartResponse';
import CartService from '../services/CartService';
import IViewCartProps from '../types/Props/IViewCartProps';

function Cart(props: IViewCartProps) {
    let history = useHistory();

    const [purchaseButton, setPurchaseButton] = useState<JSX.Element>();

    useEffect(() => {
        fetchCartItems();

        if (AuthService.isLoggedIn()) {
            setPurchaseButton(<button className="btn btn-success btn-lg btn-block" onClick={checkOut}>Purchase</button>)
        }
    }, []);

    props.hubConnection?.on("refresh", () => {
        fetchCartItems();
    });

    const [cartResponse, setCartResponse] = useState<ICartResponse>({
        loading: true,
        cartItems: null,
        error: false
    });

    const fetchCartItems = async () => {
        const cItems = await CartService.fetchCartItems();

        setCartResponse({
            loading: false,
            error: false,
            cartItems: await cItems.json()
        });
    };

    const removeFromCart = async (e: any) => {
        let itemId = e.target.id;
        await CartService.removeFromCart(itemId);

        props.hubConnection?.invoke("refresh");
        fetchCartItems();
    };

    const checkOut = async (e: any) => {
        e.preventDefault();

        setPurchaseButton(<button className="btn btn-success btn-lg btn-block" disabled>Purchasing...</button>);

        await fetch("https://bookversity-backend.azurewebsites.net/api/Cart/Checkout", {
            method: 'POST',
            headers: {
                'Authorization': AuthService.getAuthHeader().Authorization
            }
        })
        .then(res => res.json())
        .then((data) => {
            history.push(`/myaccount/orders/${data.orderId}`);
        });
    };

    if (!AuthService.isLoggedIn()) {
        return (
            <div>
                Please login!
            </div>
        )
    } else {
        if (cartResponse.loading) {
            return (
                <h4>Loading..</h4>
            )
        } else {
            var Items: JSX.Element[] = [];
            let total = 0;

            if (cartResponse.cartItems !== null) {
                for (let i = 0; i < cartResponse.cartItems.length; i++) {
                    let currentItem = cartResponse.cartItems[i];
                    total += Number(currentItem.price);

                    Items.push(
                        <div key={currentItem.id} className="col-sm-4 mt-3 mb-3">
                            <div className="card">
                                <img src={currentItem.itemImageUrl} alt={currentItem.itemName} className="card-img-top"></img>
                                <div className="card-body">
                                    <h5 className="card-title">{currentItem.itemName}</h5>
                                    <p className="card-text">Price: ${currentItem.price}</p>
                                    <button id={currentItem.id} onClick={removeFromCart} className="btn btn-danger btn-block btn-large">Remove from cart</button> 
                                </div>
                            </div>
                        </div>
                    );
                }
            }

            return (
                <Container>
                    <Row>
                        <Col>
                            <div className="card mt-5">
                                <h5 className="card-header">Your Cart:</h5>
                                <div className="card-body">
                                    <div className="container">
                                        <div className="row">
                                            {Items}
                                        </div>
                                    </div>
                                    {/* {Items} */}
                                    <hr />
                                    <div className="mt-3">
                                        <h5>Total: ${total}</h5>
                                        {purchaseButton}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

export default Cart;