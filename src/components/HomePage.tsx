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
    const [faculties, setFaculties] = useState<Array<string>>([]);

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

    const searchItems = async () => {
        const sItems = await fetch(
            `https://bookversity-backend.azurewebsites.net/api/Item/Search?itemName=${searchTerm}`
        );

        const allSearchItems = await sItems.json();
        setItems({
            loading: false,
            data: allSearchItems,
            error: false
        });
    };

    const updateFunc = () => {
        hubConnection?.invoke("refresh");
        fetchItems();
    };

    const onSearchChange = (e: any) => {
        if (e.target.value === "") {
            fetchItems();
        } else {
            setSearchTerm(e.target.value);
            searchItems();
        }
    };

    const onFacultyClick = (e: any) => {
        e.preventDefault();

        let newFaculties = faculties;
        newFaculties.push(e.currentTarget.getAttribute("href"))
        setFaculties(newFaculties);
        console.log(newFaculties);
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3">
                        <div className="card mt-3">
                            <h5 className="card-header">Filters</h5>
                            <div className="card-body">
                                <label htmlFor="search-bar">Search:</label>
                                <input className="form-control mb-3" placeholder="Search..." name="search-bar" onChange={onSearchChange}></input>

                                {/* <label>By Faculty:</label>
                                <div>
                                    <a href="Science" onClick={onFacultyClick}><span className="ml-1 badge badge-secondary">Science<button type="button" className="close"></button></span></a>
                                    <span className="ml-1 badge badge-secondary">Engineering</span>
                                    <span className="ml-1 badge badge-secondary">Business</span>
                                    <span className="ml-1 badge badge-secondary">Arts</span>
                                    <span className="ml-1 badge badge-secondary">Medical and Health Science</span>
                                    <span className="ml-1 badge badge-secondary">Law</span>
                                    <span className="ml-1 badge badge-secondary">Education and Social Work</span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="container">
                            <div className="row">
                                <div className="card mt-3">
                                    <h5 className="card-header">Items for sale</h5>
                                    <div className="card-body">
                                        <div className="container">
                                            <div className="row">
                                                {Items}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;