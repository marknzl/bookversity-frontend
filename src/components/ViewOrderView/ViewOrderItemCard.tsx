import React from 'react';
import IViewOrderItemCard from '../../types/Props/IViewOrderItemCard';
import IItem from '../../shared/IItem';

function ViewOrderItemCard(props: IViewOrderItemCard) {
    let item: IItem = props.item;

    return (
        <div key={item.id} className="col-sm-4 mt-3">
            <div className="card">
                <img src={item.itemImageUrl} alt={item.itemName} className="card-img-top"></img>
                <div className="card-body">
                    <h5 className="card-title">{item.itemName}</h5>
                    <p className="card-text">Price: ${item.price}</p>
                    <p><strong>Contact seller: </strong>{item.sellerEmail}</p>
                </div>
            </div>
        </div>
    )
}

export default ViewOrderItemCard;