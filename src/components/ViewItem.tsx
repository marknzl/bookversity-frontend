import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams, useHistory} from "react-router-dom";

import AuthService from '../services/AuthService';
import CartService from '../services/CartService';
import IViewItemResponse from '../types/Response Types/IViewItemResponse';
import ItemService from '../services/ItemService';
// import { HubConnectionBuilder, LogLevel, HubConnection } from '@microsoft/signalr';
import IViewItemProps from '../types/Props/IViewItemProps';

function ViewItem(props: IViewItemProps) {
    let { id } = useParams();
    let history = useHistory();

    useEffect(() => {
        props.hubConnection?.on("refresh", () => {
            fetchItem();
        });

        fetchItem();
    }, []);
    
    // const [hubConnection, setHubConnection] = useState<HubConnection>();

    // useEffect(() => {
    //     const createHubConnection = async () => {
    //         const conn = new HubConnectionBuilder().withUrl("https://bookversity-backend.azurewebsites.net/refreshHub")
    //             .configureLogging(LogLevel.Information)
    //             .withAutomaticReconnect()
    //             .build()
    //         try {
    //             conn.on("refresh", () => {
    //                 fetchItem();
    //             });

    //             await conn.start();
    //             console.log("Real-time connection to server established.")
    //         } catch (error) {
    //             console.log("Couldn't establish a real-time connection to the server!");
    //         }

    //         setHubConnection(conn);
    //     };

    //     createHubConnection();
    // }, []);

    const [viewItemResponse, setViewItemResponse] = useState<IViewItemResponse>({
        loading: true,
        error: false,
        item: null
    });

    const fetchItem = async () => {
        const item = await ItemService.fetchItem(id);

        setViewItemResponse({
            loading: false,
            item: await item.json(),
            error: false
        });
    };

    const addToCart = (e: any) => {
        if (viewItemResponse.item !== null) {
            CartService.addToCart(Number(viewItemResponse.item.id)).then((res) => {
                props.hubConnection?.invoke("refresh");
                history.push('/cart')
            });
        }
    }

    if (viewItemResponse.loading) {
        return (
            <div>
                <h4>Loading...</h4>
            </div>
        )
    } else {
        if (viewItemResponse.item !== null) {
            let button = <button id={viewItemResponse.item.id} className="btn btn-success btn-lg btn-block" onClick={addToCart}>Add to cart</button>

            if (AuthService.isLoggedIn()) {
                if (viewItemResponse.item.sellerId === AuthService.getUserId()) {
                    button = <button id={viewItemResponse.item.id} disabled className="btn btn-success btn-lg btn-block">This is your listing</button>
                } else if (viewItemResponse.item.inUserCart) {
                    button = <button id={viewItemResponse.item.id} disabled className="btn btn-warning btn-lg btn-block">Unavailable</button>
                }
            } else {
                if (viewItemResponse.item.inUserCart) {
                    button = <button id={viewItemResponse.item.id} disabled className="btn btn-warning btn-lg btn-block">Unavailable</button>
                } else {
                    button = <button id={viewItemResponse.item.id} className="btn btn-success btn-lg btn-block" disabled>Login to add cart</button>
                }
            }

            return (
                <Container>
                    <Row>
                        <Col>
                            <div className="card mt-5">
                                <h5 className="card-header">
                                    Item details: Listing ID #{viewItemResponse.item.id}
                                </h5>
                                <div className="card-body">
                                    <div className="col-sm-4 mt-3 mb-3 mx-auto">
                                        <div className="card">
                                            <img className="card-img-top" src={viewItemResponse.item.itemImageUrl}></img>
                                            <div className="card-body">
                                                <h5 className="card-title">{viewItemResponse.item.itemName}</h5>
                                                <p className="card-text">Price: ${viewItemResponse.item.price}</p>
                                                <p className="card-text"><strong>Description:</strong> {viewItemResponse.item.itemDescription}</p>
                                                <p className="card-text"><small className="text-muted">Created: {new Date(Date.parse(viewItemResponse.item.timeCreated)).toLocaleDateString("en-us")}</small></p>
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
        } else {
            return (
                <div>
                    Error
                </div>
            )
        }
    }
}

export default ViewItem;