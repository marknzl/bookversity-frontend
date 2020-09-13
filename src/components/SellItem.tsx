import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useHistory } from 'react-router-dom';

import AuthService from '../services/AuthService';
import axios from 'axios';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

function SellItem() {
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState<FileList | null>(null);

    const [hubConnection, setHubConnection] = useState<HubConnection>();

    let history = useHistory();

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

    const onSubmit = async (e: any) => {
        e.preventDefault();
        
        let formData = new FormData();

        formData.append('itemName', itemName);
        formData.append('itemDescription', itemDescription);
        formData.append('itemPrice', price);

        if (image != null) {
            formData.append('image', image[0]);
        }
        

        axios.post('https://bookversity-backend.azurewebsites.net/api/Item/Create', formData, {
            headers: AuthService.getImgHeader()
        }).then((res) => {
            hubConnection?.invoke("refresh");
            console.log(res.data.id);
            //window.location.href = '/';
            history.push(`/item/${res.data.id}`);
        })
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className="card mt-5">
                            <h5 className="card-header">Sell a new item</h5>
                            <div className="card-body">
                            <form className="mt-3" onSubmit={e => onSubmit(e)}>
                                <div className="form-group">
                                    <label>Item Name</label>
                                    <input type="text" className="form-control" required onChange={e => setItemName(e.target.value)}></input>
                                </div>
                                <div className="form-group">
                                    <label>Description (Max 150 characters)</label>
                                    <textarea className="form-control" rows={3} maxLength={150} required onChange={e => setItemDescription(e.target.value)}></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="number" onChange={e => setPrice(e.target.value)} inputMode="numeric" pattern="[0-9]*" className="form-control" min="0.00" required></input>
                                </div>
                                <div className="form-group">
                                    <label>Upload your image:</label><br></br>
                                    <input type="file" accept="image/*" onChange={e => setImage(e.target.files)}></input>
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