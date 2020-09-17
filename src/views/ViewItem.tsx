import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams, useHistory} from "react-router-dom";

import AuthService from '../services/AuthService';
import CartService from '../services/CartService';
import IViewItemResponse from '../types/Response Types/IViewItemResponse';
import ItemService from '../services/ItemService';
import IViewItemProps from '../types/Props/IViewItemProps';
import ViewItemCard from '../components/ViewItemView/ViewItemCard';
import IItem from '../shared/IItem';

function ViewItem(props: IViewItemProps) {
    let { id } = useParams();
    let history = useHistory();

    useEffect(() => {
        props.hubConnection?.on("refresh", () => {
            fetchItem();
        });

        fetchItem();
    }, []);

    const [viewItemResponse, setViewItemResponse] = useState<IViewItemResponse>({
        loading: true,
        error: false,
        item: null
    });

    const fetchItem = async () => {
        const item = await ItemService.fetchItem(id);

        setViewItemResponse({
            loading: false,
            item: await item.json(),
            error: false
        });
    };

    const addToCart = (e: any) => {
        if (viewItemResponse.item !== null) {
            CartService.addToCart(Number(viewItemResponse.item.id)).then((res) => {
                props.hubConnection?.invoke("refresh");
                history.push('/cart')
            });
        }
    }

    if (viewItemResponse.loading) {
        return (
            <div>
                <h4>Loading...</h4>
            </div>
        )
    } else {
        if (viewItemResponse.item !== null) {
            let item: IItem = viewItemResponse.item;
            let button = <button id={item.id} className="btn btn-success btn-lg btn-block" onClick={addToCart}>Add to cart</button>

            if (AuthService.isLoggedIn()) {
                if (item.sellerId === AuthService.getUserId()) {
                    button = <button id={item.id} disabled className="btn btn-success btn-lg btn-block">This is your listing</button>
                } else if (item.inUserCart) {
                    button = <button id={item.id} disabled className="btn btn-warning btn-lg btn-block">Unavailable</button>
                }
            } else {
                if (viewItemResponse.item.inUserCart) {
                    button = <button id={item.id} disabled className="btn btn-warning btn-lg btn-block">Unavailable</button>
                } else {
                    button = <button id={item.id} className="btn btn-success btn-lg btn-block" disabled>Login to add cart</button>
                }
            }

            return (
                <ViewItemCard item={item} button={button}/>
            )
        } else {
            return (
                <div>
                    Error
                </div>
            )
        }
    }
}

export default ViewItem;