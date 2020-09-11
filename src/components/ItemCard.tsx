import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from '../services/AuthService';
import CartService from '../services/CartService';

interface IItemCardProps {
    ItemName: string;
    ImageUrl: string;
    Price: number;
    Id: string;
}

function ItemCard(props: IItemCardProps) {
    let buyButton = null;

    const addToCart = (e: any) => {
        console.log(e.target.id);

        CartService.addToCart(e.target.id).then((res) => {
            console.log(res);
        });
    }

    if (AuthService.isLoggedIn()) {
        buyButton = <button id={props.Id} className="btn btn-success btn-block btn-lg" onClick={addToCart}>Add to cart</button>
    } else {
        buyButton = <button id={props.Id} className="btn btn-success btn-block btn-lg" disabled onClick={addToCart}>Login to add to cart!</button>
    }

    return (
        <div className="col-sm-4 mt-3 mb-3">
            <div className="card">
                <img src={props.ImageUrl} className="card-img-top"></img>
                <div className="card-body">
                    <h5 className="card-title">{props.ItemName}</h5>
                    <p className="card-text">Price: ${props.Price}</p> 
                    {buyButton}
                </div>
            </div>
        </div>
    )
}

export default ItemCard;