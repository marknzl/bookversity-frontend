import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import IMyItemsResponse from '../types/Response Types/IMyItemsResponse';
import ItemService from '../services/ItemService';
import IMyItemsProps from '../types/Props/IMyItemsProps';

function MyItems(props: IMyItemsProps) {
    useEffect(() => {
        props.hubConnection?.on("refresh", () => {
            fetchMyItems();
        });

        fetchMyItems();
    }, []);

    let history = useHistory();

    const [myItemsResponse, setMyItemsResponse] = useState<IMyItemsResponse>({
        loading: true,
        myItems: null,
        error: false
    });

    const fetchMyItems = async () => {
        const mItems = await ItemService.myItems();

        setMyItemsResponse({
            loading: false,
            myItems: await mItems.json(),
            error: false
        });
    };

    const navigate = (e: any) => {
        e.preventDefault();
        history.push(`${e.currentTarget.getAttribute('href')}`);
    };

    const deleteItem = async (e: any) => {
        let itemId = e.target.id;
        await ItemService.deleteItem(itemId);

        props.hubConnection?.invoke('refresh');
        fetchMyItems();
    };

    var Items: JSX.Element[] = [];

    if (!myItemsResponse.loading && myItemsResponse.myItems !== null) {
        for (let i = 0; i < myItemsResponse.myItems.length; i++) {
            let currentItem = myItemsResponse.myItems[i];

            let button: JSX.Element = <button id={currentItem.id} onClick={deleteItem} className="btn btn-danger btn-lg btn-block">Delete</button>

            if (currentItem.sold) {
                button = <button id={currentItem.id} onClick={deleteItem} className="btn btn-warning btn-lg btn-block" disabled>Sold</button>
            } else if (currentItem.inCart) {
                button = <button id={currentItem.id} onClick={deleteItem} className="btn btn-warning btn-lg btn-block" disabled>In user cart</button>
            }

            Items.push(
                <div key={currentItem.id} className="col-sm-4 mt-3">
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

    if (myItemsResponse.loading) {
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