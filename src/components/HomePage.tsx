import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import IHomePageItems from '../shared/IHomePageItems';
import ItemCard from './ItemCard';

import { HubConnectionBuilder, LogLevel, HubConnection } from '@microsoft/signalr';

import AuthService from '../services/AuthService';

function HomePage() {
    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState<IHomePageItems>({
        loading: true,
        data: null,
        error: false
    });

    const [searchTerm, setSearchTerm] = useState<string | null>("");

    const [hubConnection, setHubConnection] = useState<HubConnection>();

    useEffect(() => {
        const createHubConnection = async () => {
            const conn = new HubConnectionBuilder().withUrl("https://bookversity-backend.azurewebsites.net/refreshHub")
                .configureLogging(LogLevel.Information)
                .withAutomaticReconnect()
                .build()

            try {
                conn.on("refresh", () => {
                    fetchItems();
                });

                await conn.start();
                console.log("Real-time connection to server established.")
            } catch (error) {
                console.log("Couldn't establish a real-time connection to the server!");
            }

            setHubConnection(conn);
        };

        createHubConnection();
    }, []);

    const fetchItems = async () => {
        const fItems = await fetch(
            "https://bookversity-backend.azurewebsites.net/api/Item/Latest10"
        );

        const allItems = await fItems.json();
        setItems({
            loading: false,
            data: allItems,
            error: false
        });
    }

    const updateFunc = () => {
        hubConnection?.invoke("refresh");
        fetchItems();
    };

    const onSearchChange = (e: any) => {
        console.log(e.target.value);
        setSearchTerm(e.target.value);
    };

    var Items: JSX.Element[] = [];

    if (items.data != null) {

        for (let i = 0; i < items.data.length; i++) {
            if (items.data === null) {
                return (
                    <div>

                    </div>
                )
            }

            let item = items.data[i];

            if (AuthService.isLoggedIn()) {
                if (AuthService.getUserId() !== item.sellerId) {
                    Items.push(
                        <ItemCard ItemName={item.itemName} UpdateFunc={updateFunc} ImageUrl={item.itemImageUrl} Price={item.price} Id={item.id}></ItemCard>
                    )
                }
            } else {
                Items.push(
                    <ItemCard ItemName={item.itemName} UpdateFunc={updateFunc} ImageUrl={item.itemImageUrl} Price={item.price} Id={item.id}></ItemCard>
                )
            }
        }
    }   

    if (items.loading) {
        return (
            <div>
                <Container>
                    <Row>
                        <Col className="mt-4">
                            <h4>Loading items..</h4>
                        </Col>
                    </Row>
                </Container>
            </div>
        ) 
    } else {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <input className="form-control mt-3 mb-3" placeholder="Search..." onChange={onSearchChange}></input>
                    </div>
                    {Items}
                </div>
            </div>
        )
    }
}

export default HomePage;