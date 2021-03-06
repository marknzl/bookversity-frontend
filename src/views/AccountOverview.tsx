import React, { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';
import IAccountOverviewResponse from '../types/Response Types/IAccountOverviewResponse';
import IAccountOverview from '../types/IAccountOverview';
import AccountOverviewCard from '../components/AccountOverviewView/AccountOverviewCard';

function AccountOverview() {
    useEffect(() => {
        fetchAccountOverview();
    }, []);

    const [accountOverviewResponse, setAccountOverviewResponse] = useState<IAccountOverviewResponse>({
        loading: true,
        accountOverview: null,
        error: false 
    });

    const fetchAccountOverview = async () => {
        const mOverview = await fetch("https://bookversity-backend.azurewebsites.net/api/User/Overview", {
            headers: {
                'Authorization': `${AuthService.getAuthHeader().Authorization}`
            }
        });

        setAccountOverviewResponse({
            loading: false,
            accountOverview: await mOverview.json(),
            error: false
        });
    };

    if (accountOverviewResponse.loading) {
        return (
            <div className="card">
            <h5 className="card-header">Overview</h5>
                <div className="card-body">
                    Loading...
                </div>
            </div>
        )
    } else {
        if (accountOverviewResponse.accountOverview !== null) {
            let overview: IAccountOverview = accountOverviewResponse.accountOverview;

            return (
                <AccountOverviewCard overview={overview}/>
            )
        } else {
            return (
                <div>
                    Error
                </div>
            )
        }
    }
}

export default AccountOverview;