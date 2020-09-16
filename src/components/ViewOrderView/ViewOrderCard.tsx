import React from 'react';
import IViewOrderCardProps from '../../types/Props/IViewOrderCardProps';

function ViewOrderCard(props: IViewOrderCardProps) {
    return (
        <div className="card">
            <h5 className="card-header">Order #{props.id}</h5>
            <div className="card-body">
                <div className="container">
                    <div className="row">
                        {props.itemsPurchased}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewOrderCard;