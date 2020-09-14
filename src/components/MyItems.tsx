import React, { useState, useEffect } from 'react';
import IItem from '../shared/IItem';
import AuthService from '../services/AuthService';
import { useHistory } from "react-router-dom";
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

function MyItems() {
    useEffect(() => {
        fetchMyItems();
    }, []);

    let history = useHistory();

    const [myItems, setMyItems] = useState<IItem>({
        loading: true,
        data: null,
        error: false
    });

    const [hubConnection, setHubConnection] = useState<HubConnection>();

    useEffect(() => {
        const createHubConnection = async () => {
            const conn = new HubConnectionBuilder().withUrl("https://bookversity-backend.azurewebsites.net/refreshHub")
                .configureLogging(LogLevel.Information)
                .withAutomaticReconnect()
                .build()

            try {
                await conn.start();
                conn.on('refresh', () => {
                    fetchMyItems();
                });
                console.log("Real-time connection to server established.")
            } catch (error) {
                console.log("Couldn't establish a real-time connection to the server!");
            }

            setHubConnection(conn);
        };

        createHubConnection();
    }, []);

    const fetchMyItems = async () => {
        const mItems = await fetch("https://bookversity-backend.azurewebsites.net/api/Item/MyItems", {
            headers: {
                'Authorization': `${AuthService.getAuthHeader().Authorization}`
            }
        });

        const allMyItems = await mItems.json();
        setMyItems({
            loading: false,
            data: allMyItems,
            error: false
        });
    };

    const navigate = (e: any) => {
        e.preventDefault();
        history.push(`${e.currentTarget.getAttribute('href')}`);
    };

    const deleteItem = async (e: any) => {
        let itemId = e.target.id;
        await fetch(`https://bookversity-backend.azurewebsites.net/api/Item/DeleteItem?itemId=${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${AuthService.getAuthHeader().Authorization}`
            },
        });

        hubConnection?.invoke('refresh');
        fetchMyItems();
    };

    var Items: JSX.Element[] = [];

    if (!myItems.loading) {
        for (let i = 0; i < myItems.data.length; i++) {
            let currentItem = myItems.data[i];

            let button: JSX.Element = <button id={currentItem.id} onClick={deleteItem} className="btn btn-danger btn-lg btn-block">Delete</button>

            if (currentItem.sold) {
                button = <button id={currentItem.id} onClick={deleteItem} className="btn btn-warning btn-lg btn-block" disabled>Sold</button>
            } else if (currentItem.inCart) {
                button = <button id={currentItem.id} onClick={deleteItem} className="btn btn-warning btn-lg btn-block" disabled>In user cart</button>
            }

            Items.push(
                <div className="col-sm-4 mt-3">
                    <div className="card">
                        <img src={currentItem.itemImageUrl} alt={currentItem.itemName} className="card-img-top"></img>
                        <div className="card-body">
                            <h5 className="card-title"><a href={`/item/${currentItem.id}`} onClick={navigate}>{currentItem.itemName}</a></h5>
                            <p className="card-text">Price: ${currentItem.price}</p>
                            {button}
                        </div>
                    </div>
                </div>
            );
        }
    }

    if (myItems.loading) {
        return (
            <div className="card">
                <h5 className="card-header">My Items</h5>
                <div className="card-body">
                    Loading...
                </div>
            </div> 
        )
    } else {
        return (
            <div className="card">
                <h5 className="card-header">My Items</h5>
                <div className="card-body">
                    <div className="container">
                        <div className="row">
                            {Items}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyItems;