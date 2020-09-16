import React, { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';
import IMyOrdersResponse from '../types/Response Types/IMyOrdersResponse';

import { useHistory } from "react-router-dom";
import YourOrdersItemRow from '../components/OrdersView/YourOrdersItemRow';
import YourOrdersCard from '../components/OrdersView/YourOrdersCard';

function Orders() {
    useEffect(() => {
        fetchOrders();
    }, []);

    let history = useHistory();

    const [myOrdersResponse, setMyOrdersResponse] = useState<IMyOrdersResponse>({
        loading: true,
        myOrders: null,
        error: false
    });

    const fetchOrders = async () => {
        const mOrders = await fetch("https://bookversity-backend.azurewebsites.net/api/Orders/MyOrders", {
            headers: {
                'Authorization': `${AuthService.getAuthHeader().Authorization}`
            }
        });

        setMyOrdersResponse({
            loading: false,
            myOrders: await mOrders.json(),
            error: false
        });
    };
    
    // const navigate = (e: any) => {
    //     e.preventDefault();
    //     let orderId = e.target.id;

    //     history.push('/myaccount/orders/' + orderId);
    // };

    if (myOrdersResponse.loading) {
        return (
            <div className="card">
                <h5 className="card-header">Your orders</h5>
                <div className="card-body">
                    Loading...
                </div>
            </div>
        )
    } else {
        var Orders: JSX.Element[] = [];

        if (myOrdersResponse.myOrders != null) {
            for (let i = 0; i < myOrdersResponse.myOrders.length; i++) {
                let currentOrder = myOrdersResponse.myOrders[i];
                
                Orders.push(
                    <YourOrdersItemRow order={currentOrder} />
                )
            }
        }   

        return (
            <YourOrdersCard orders={Orders}/>
        )
    }
}

export default Orders;