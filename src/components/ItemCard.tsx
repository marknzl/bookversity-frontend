import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from '../services/AuthService';
import CartService from '../services/CartService';
import { useHistory } from "react-router-dom";
import { HubConnectionBuilder, HubConnection, LogLevel } from '@microsoft/signalr';

interface IItemCardProps {
    ItemName: string;
    ImageUrl: string;
    Price: number;
    Id: string;
    UpdateFunc: () => void;
}

function ItemCard(props: IItemCardProps) {
    let buyButton = null;

    let history = useHistory();

    const [hubConnection, setHubConnection] = useState<HubConnection>();

    useEffect(() => {
        const createHubConnection = async () => {
            const conn = new HubConnectionBuilder().withUrl("https://localhost:5001/refreshHub")
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

    const addToCart = (e: any) => {
        //console.log(e.target.id);

        CartService.addToCart(e.target.id).then((res) => {
            //console.log(res);
            hubConnection?.send("refresh");
            props.UpdateFunc();
        });
    }

    const navigate = (e: any) => {
        e.preventDefault();

        history.push(`/item/${props.Id}`);
    };

    if (AuthService.isLoggedIn()) {
        buyButton = <button id={props.Id} className="btn btn-success btn-block btn-lg" onClick={addToCart}>Add to cart</button>
    } else {
        buyButton = <button id={props.Id} className="btn btn-success btn-block btn-lg" disabled onClick={addToCart}>Login to add to cart!</button>
    }

    return (
        <div className="col-sm-4 mt-3 mb-3">
            <div className="card">
                <img src={props.ImageUrl} alt={props.ItemName} className="card-img-top"></img>
                <div className="card-body">
                    <h5 className="card-title"><a href={`/item/${props.Id}`} onClick={navigate}>{props.ItemName}</a></h5>
                    <p className="card-text">Price: ${props.Price}</p> 
                    {buyButton}
                </div>
            </div>
        </div>
    )
}

export default ItemCard;