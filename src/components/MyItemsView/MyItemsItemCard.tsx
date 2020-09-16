import React from 'react';
import IMyItemsItemCardProps from '../../types/Props/IMyItemsItemCardProps';
import IItem from '../../shared/IItem';

import { useHistory } from 'react-router-dom';

function MyItemsItemCard(props: IMyItemsItemCardProps) {
    let item: IItem = props.item;
    let history = useHistory();

    const navigate = (e: any) => {
        e.preventDefault();
        history.push(`${e.currentTarget.getAttribute('href')}`);
    };

    return (
        <div key={item.id} className="col-sm-4 mt-3">
            <div className="card">
                <img src={item.itemImageUrl} alt={item.itemName} className="card-img-top"></img>
                <div className="card-body">
                    <h5 className="card-title"><a href={`/item/${item.id}`} onClick={navigate}>{item.itemName}</a></h5>
                    <p className="card-text">Price: ${item.price}</p>
                    {props.button}
                </div>
            </div>
        </div>
    )
}

export default MyItemsItemCard;