import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AuthService from '../services/AuthService';
import { HubConnectionBuilder, HubConnection, LogLevel } from '@microsoft/signalr';

interface ICartItems {
    loading: boolean;
    data: any;
    error: boolean;
}

function Cart() {
    useEffect(() => {
        fetchCartItems();
    }, []);

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

        const allCartItems = await cItems.json();
        setCartItems({
            loading: false,
            error: false,
            data: allCartItems
        });
    };

    const [hubConnection, setHubConnection] = useState<HubConnection>();

    useEffect(() => {
        const createHubConnection = async () => {
            const conn = new HubConnectionBuilder().withUrl("https://bookversity-backend.azurewebsites.net/refreshHub")
                .configureLogging(LogLevel.Information)
                .withAutomaticReconnect()
                .build()

            try {
                await conn.start();
                console.log("Real-time connection to server established.")
            } catch (error) {
                console.log("Couldn't establish a real-time connection to the server!");
            }

            setHubConnection(conn);
        };

        createHubConnection();
    }, []);

    const removeFromCart = async (e: any) => {
        let itemId = e.target.id;
        await fetch(`https://bookversity-backend.azurewebsites.net/api/Cart/Remove?itemId=${itemId}`, {
            method: 'POST',
            headers: {
                'Authorization': `${AuthService.getAuthHeader().Authorization}`
            },
        });

        hubConnection?.invoke("refresh");
        fetchCartItems();
    };

    if (!AuthService.isLoggedIn()) {
        return (
            <div>
                Please login!
            </div>
        )
    } else {
        if (cartItems.loading) {
            return (
                <h4>Loading..</h4>
            )
        } else {
            var Items: JSX.Element[] = [];
            let total = 0;

            for (let i = 0; i < cartItems.data.length; i++) {
                let currentItem = cartItems.data[i];
                total += Number(currentItem.price);

                Items.push(
                    <div className="col-sm-4 mt-3 mb-3">
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
                                        <button className="btn btn-success btn-lg btn-block">Purchase</button>
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