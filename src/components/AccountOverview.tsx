import React, { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';
import IItem from '../shared/IItem';

function AccountOverview() {
    useEffect(() => {
        fetchAccountOverview();
    }, []);

    const [accountOverview, setAccountOverView] = useState<IItem>({
        loading: true,
        data: null,
        error: false 
    });

    const fetchAccountOverview = async () => {
        const mOverview = await fetch("https://bookversity-backend.azurewebsites.net/api/User/Overview", {
            headers: {
                'Authorization': `${AuthService.getAuthHeader().Authorization}`
            }
        });

        const overview = await mOverview.json();
        setAccountOverView({
            loading: false,
            data: overview,
            error: false
        });
    };

    if (accountOverview.loading) {
        return (
            <div className="card">
            <h5 className="card-header">Overview</h5>
                <div className="card-body">
                    Loading...
                </div>
            </div>
        )
    } else {
        let data:any = accountOverview.data;

        let email: string = data.email;
        let firstName: string = data.firstName;
        let lastname: string = data.lastName;
        let itemsListed: Number = data.itemsListed;
        let itemsForSale: Number = data.itemsForSale;
        let totalItemsSold: Number = data.totalItemsSold;
        let totalDollarSales: Number = data.totalDollarSales;

        return (
            <div className="card">
                <h5 className="card-header">Overview</h5>
                <div className="card-body">
                    <p><strong>Email: </strong>{email}</p>
                    <p><strong>First Name: </strong>{firstName}</p>
                    <p><strong>Items listed: </strong>{itemsListed}</p>
                    <p><strong>Items for sale: </strong>{itemsForSale}</p>
                    <p><strong>Total items sold: </strong>{totalItemsSold}</p>
                    <p><strong>Total dollar sales: </strong>${totalDollarSales}</p>
                </div>
            </div>
        )
    }
}

export default AccountOverview;