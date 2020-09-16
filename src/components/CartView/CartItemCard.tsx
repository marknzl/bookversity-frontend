import React from 'react';
import ICartItemCardProps from '../../types/Props/ICartItemCardProps';
import IItem from '../../shared/IItem';

function CartItemCard(props: ICartItemCardProps) {
    let item: IItem = props.item;

    return (
        <div key={item.id} className="col-sm-4 mt-3 mb-3">
            <div className="card">
                <img src={item.itemImageUrl} alt={item.itemName} className="card-img-top"></img>
                <div className="card-body">
                    <h5 className="card-title">{item.itemName}</h5>
                    <p className="card-text">Price: ${item.price}</p>
                    <button id={item.id} onClick={props.removeFromCartFunc} className="btn btn-danger btn-block btn-large">Remove from cart</button> 
                </div>
            </div>
        </div>
    )
}

export default CartItemCard;