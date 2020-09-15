import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ItemCard from './ItemCard';

//import { HubConnectionBuilder, LogLevel, HubConnection } from '@microsoft/signalr';

import AuthService from '../services/AuthService';
import IHomePageResponse from '../types/Response Types/IHomePageResponse';
import ItemService from '../services/ItemService';
import IHomePageProps from '../types/Props/IHomePageProps';

function HomePage(props: IHomePageProps) {
    const [searchTerm, setSearchTerm] = useState<string | null>("");
    //const [facultyFilters, setFacultyFilters] = useState<string[]>([]);

    props.hubConnection?.on("refresh", () => {
        fetchItems();
    });
    
    useEffect(() => {
        if (searchTerm === "") { 
            fetchItems();
        } else {
            searchItems();
        }
    }, [searchTerm]);

    const [homePageResponse, setHomePageResponse] = useState<IHomePageResponse>({
        loading: true,
        items: null,
        error: false
    });

    // const [hubConnection, setHubConnection] = useState<HubConnection>();

    // useEffect(() => {
    //     const createHubConnection = async () => {
    //         const conn = new HubConnectionBuilder().withUrl("https://bookversity-backend.azurewebsites.net/refreshHub")
    //             .configureLogging(LogLevel.Information)
    //             .withAutomaticReconnect()
    //             .build()
    //         try {
    //             conn.on("refresh", () => {
    //                 fetchItems();
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

    const fetchItems = async () => {
        // const fItems = await fetch(
        //     "https://bookversity-backend.azurewebsites.net/api/Item/Latest10"
        // );

        const fItems = await ItemService.latest10();

        setHomePageResponse({
            loading: false,
            items: await fItems.json(),
            error: false
        })
    }

    const searchItems = async () => {
        const sItems = await ItemService.searchItems(searchTerm);

        setHomePageResponse({
            loading: false,
            items: await sItems.json(),
            error: false
        });
    };

    const updateFunc = () => {
        props.hubConnection?.invoke("refresh");
        fetchItems();
    };

    // const onFacultyClick = (e: any) => {
    //     e.preventDefault();
    //     let faculty = e.currentTarget.getAttribute("href")
    //     let newFaculties = facultyFilters;

    //     newFaculties.push(faculty)
    //     setFacultyFilters(facultyFilters);
    //     console.log(facultyFilters);
    // }

    const handleSearchTermChange = (s: string | null) => {
        setSearchTerm(s);
    };

    var Items: JSX.Element[] = [];

    if (homePageResponse.items != null) {
        for (let i = 0; i < homePageResponse.items.length; i++) {
            if (homePageResponse.items === null) {
                return (
                    <div>

                    </div>
                )
            }

            let item = homePageResponse?.items[i];

            if (AuthService.isLoggedIn()) {
                if (AuthService.getUserId() !== item.sellerId) {
                    Items.push(
                        <ItemCard key={item.id} item={item} updateFunc={updateFunc}></ItemCard>
                    )
                }
            } else {
                Items.push(
                    <ItemCard key={item.id} item={item} updateFunc={updateFunc}></ItemCard>
                )
            }
        }
    }

    if (homePageResponse.loading) {
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
                                <input className="form-control mb-3" placeholder="Search..." name="search-bar" onChange={e => handleSearchTermChange(e.target.value)}></input>

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