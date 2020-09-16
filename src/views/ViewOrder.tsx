import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import IViewOrderResponse from '../types/Response Types/IViewOrderResponse';
import OrderService from '../services/OrderService';
import ViewOrderCard from '../components/ViewOrderView/ViewOrderCard';
import ViewOrderItemCard from '../components/ViewOrderView/ViewOrderItemCard';

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
                    <ViewOrderItemCard item={currentItem}/>
                )
            }
        }

        return (
            <ViewOrderCard itemsPurchased={ItemsPurchased} id={id} />
        )
    }
}

export default ViewOrder;