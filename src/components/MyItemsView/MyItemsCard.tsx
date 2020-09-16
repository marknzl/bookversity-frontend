import React from 'react';
import IMyItemsCardProps from '../../types/Props/IMyItemsCardProps';

function MyItemsCard(props: IMyItemsCardProps) {
    return (
        <div className="card">
            <h5 className="card-header">My Items</h5>
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