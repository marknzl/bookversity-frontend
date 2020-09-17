import React from 'react';
import IViewOrderCardProps from '../../types/Props/IViewOrderCardProps';

function ViewOrderCard(props: IViewOrderCardProps) {
    return (
        <div className="card border-dark">
            <h5 className="card-header bg-dark text-white">Order #{props.id}</h5>
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