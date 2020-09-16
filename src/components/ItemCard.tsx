import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from '../services/AuthService';
import CartService from '../services/CartService';
import { useHistory } from "react-router-dom";
import IItemCardProps from '../types/Props/IItemCardProps';

function ItemCard(props: IItemCardProps) {
    //let buyButton = null;
    const [buyButton, setBuyButton] = useState<JSX.Element>();

    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            setBuyButton(<button id={props.item.id} className="btn btn-success btn-block btn-lg" onClick={addToCart}>Add to cart</button>)
        } else {
            setBuyButton(<button id={props.item.id} className="btn btn-success btn-block btn-lg" disabled onClick={addToCart}>Login to add to cart!</button>)
        }
    }, []);

    let history = useHistory();

    const addToCart = (e: any) => {
        //console.log(e.target.id);
        setBuyButton(<button id={props.item.id} className="btn btn-success btn-block btn-lg" disabled>Adding to cart...</button>);

        CartService.addToCart(e.target.id).then((res) => {
            //console.log(res);
            props.updateFunc();
        });
    }

    const navigate = (e: any) => {
        e.preventDefault();
        history.push(`/item/${props.item.id}`);
    };

    return (
        <div className="col-sm-4 mt-3 mb-3">
            <div className="card">
                <img src={props.item.itemImageUrl} alt={props.item.itemName} className="card-img-top"></img>
                <div className="card-body">
                    <h5 className="card-title"><a href={`/item/${props.item.id}`} onClick={navigate}>{props.item.itemName}</a></h5>
                    <p className="card-text">Price: ${props.item.price}</p> 
                    {buyButton}
                </div>
            </div>
        </div>
    )
}

export default ItemCard;