import React, { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';
import IItem from '../shared/IItem';

function Orders() {
    useEffect(() => {
        fetchOrders();
    }, []);

    const [myOrders, setMyOrders] = useState<IItem>({
        loading: true,
        data: null,
        error: false
    });

    const fetchOrders = async () => {
        const mOrders = await fetch("https://bookversity-backend.azurewebsites.net/api/Orders/MyOrders", {
            headers: {
                'Authorization': `${AuthService.getAuthHeader().Authorization}`
            }
        });

        const allMyOrders = await mOrders.json();

        setMyOrders({
            loading: false,
            data: allMyOrders,
            error: false
        });
    };

    if (myOrders.loading) {
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

        for (let i = 0; i < myOrders.data.length; i++) {
            let currentOrder = myOrders.data[i];
            
            Orders.push(
                <tr>
                    <th scope="row">{currentOrder.id}</th>
                    <td>${currentOrder.total}</td>
                    <td>{new Date(Date.parse(currentOrder.transactionDate)).toLocaleDateString("en-us")}</td>
                </tr>
            )
        }

        return (
            <div className="card">
                <h5 className="card-header">Your orders</h5>
                <div className="card-body">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Orders}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Orders;