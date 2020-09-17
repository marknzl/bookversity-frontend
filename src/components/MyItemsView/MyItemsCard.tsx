import React from 'react';
import IMyItemsCardProps from '../../types/Props/IMyItemsCardProps';

function MyItemsCard(props: IMyItemsCardProps) {
    return (
        <div className="card border-dark">
            <h5 className="card-header bg-dark text-white">My Items</h5>
            <div className="card-body">
                <div className="container">
                    <div className="row">
                        {props.items}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyItemsCard;