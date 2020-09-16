import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useHistory } from 'react-router-dom';

import AuthService from '../services/AuthService';
import axios from 'axios';
import ISellItemProps from '../types/Props/ISellItemProps';

function SellItem(props: ISellItemProps) {
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState<FileList | null>(null);

    const [clickedButton, setClickedButton] = useState<boolean>(false);

    let history = useHistory();

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setClickedButton(true);
        
        let formData = new FormData();

        formData.append('itemName', itemName);
        formData.append('itemDescription', itemDescription);
        formData.append('itemPrice', price);

        if (image != null) {
            formData.append('image', image[0]);
        }
        
        axios.post('https://bookversity-backend.azurewebsites.net/api/Item/Create', formData, {
            headers: AuthService.getImgHeader()
        }).then((res) => {
            props.hubConnection?.invoke("refresh");
            //console.log(res.data.id);
            //window.location.href = '/';
            history.push(`/item/${res.data.id}`);
        })
    };

    let button = <button type="submit" className="btn btn-primary btn-lg btn-block">Sell!</button>

    if (clickedButton) {
        button = <button type="submit" className="btn btn-primary btn-lg btn-block" disabled>Creating listing...</button>
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className="card mt-5">
                            <h5 className="card-header">Sell a new item</h5>
                            <div className="card-body">
                            <form className="mt-3" onSubmit={e => onSubmit(e)}>
                                <div className="form-group">
                                    <label>Item Name</label>
                                    <input type="text" className="form-control" required onChange={e => setItemName(e.target.value)}></input>
                                </div>
                                <div className="form-group">
                                    <label>Description (Max 150 characters)</label>
                                    <textarea className="form-control" rows={3} maxLength={150} required onChange={e => setItemDescription(e.target.value)}></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="number" onChange={e => setPrice(e.target.value)} inputMode="numeric" pattern="[0-9]*" className="form-control" min="0.00" required></input>
                                </div>
                                <div className="form-group">
                                    <label>Upload your image:</label><br></br>
                                    <input type="file" accept="image/*" onChange={e => setImage(e.target.files)}></input>
                                </div>

                                {/* <button type="submit" className="btn btn-primary btn-lg btn-block">Sell!</button> */}
                                {button}
                            </form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SellItem;