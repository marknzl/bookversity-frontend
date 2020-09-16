import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import IViewOrderResponse from '../types/Response Types/IViewOrderResponse';
import OrderService from '../services/OrderService';

function ViewOrder() {
    let { id } = useParams();

    useEffect(() => {
        fetchOrder();
    }, []);

    const [viewOrderResponse, setViewOrderResponse] = useState<IViewOrderResponse>({
        loading: true,
        error: false,
        order: null
    });

    const fetchOrder = async() => {
        const order = await OrderService.viewOrder(id);

        setViewOrderResponse({
            loading: false,
            error: false,
            order: await order.json()
        });
    };

    if (viewOrderResponse.loading) {
        return (
            <div className="card">
            <h5 className="card-header">Overview</h5>
                <div className="card-body">
                    Loading...
                </div>
            </div>
        )
    } else {
        var ItemsPurchased: JSX.Element[] = [];

        if (viewOrderResponse.order !== null) {
            for (let i = 0; i < viewOrderResponse.order.itemsPurchased.length; i++) {
                let currentItem = viewOrderResponse.order.itemsPurchased[i].item;

                ItemsPurchased.push(
                    <div key={currentItem.id} className="col-sm-4 mt-3">
                        <div className="card">
                            <img src={currentItem.itemImageUrl} alt={currentItem.itemName} className="card-img-top"></img>
                            <div className="card-body">
                                <h5 className="card-title">{currentItem.itemName}</h5>
                                <p className="card-text">Price: ${currentItem.price}</p>
                                <p><strong>Contact seller: </strong>{currentItem.sellerEmail}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className="card">
                <h5 className="card-header">Order #{id}</h5>
                <div className="card-body">
                    <div className="container">
                        <div className="row">
                            {ItemsPurchased}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewOrder;