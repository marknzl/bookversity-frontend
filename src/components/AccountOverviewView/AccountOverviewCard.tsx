import React from 'react';
import IAccountOverviewCardProps from '../../types/Props/IAccountOverviewCardProps';

function AccountOverviewCard(props: IAccountOverviewCardProps) {
    return (
        <div className="card border-dark">
            <h5 className="card-header bg-dark text-white">Overview</h5>
            <div className="card-body">
                <p><strong>Email: </strong>{props.overview.email}</p>
                <p><strong>First Name: </strong>{props.overview.firstName}</p>
                <p><strong>Last Name: </strong>{props.overview.lastName}</p>
                <p><strong>Items listed: </strong>{props.overview.itemsListed}</p>
                <p><strong>Items for sale: </strong>{props.overview.itemsForSale}</p>
                <p><strong>Total items sold: </strong>{props.overview.totalItemsSold}</p>
                <p><strong>Total dollar sales: </strong>${props.overview.totalDollarSales}</p>
            </div>
        </div>
    )
}

export default AccountOverviewCard;