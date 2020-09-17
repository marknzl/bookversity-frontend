import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Orders from './Orders';
import MyItems from './MyItems';
import AccountOverview from './AccountOverview';

import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import IMyAccountProps from '../types/Props/IMyAccountProps';
import ViewOrder from './ViewOrder';

function MyAccount(props: IMyAccountProps) {
    let history = useHistory();

    const myAccount = (e: any) => {
        e.preventDefault();
        history.push('/myaccount');
    };

    const myItems = (e: any) => {
        e.preventDefault();
        history.push('/myaccount/myitems');
    };

    const orders = (e: any) => {
        e.preventDefault();
        history.push('/myaccount/orders');
    };

    return (
        <Container>
            <Row>
                <Col>
                    <div className="card mt-4 border-dark">
                        <h5 className="card-header bg-dark text-white">Your account</h5>
                        <div className="card-body">
                            <Row>
                                <div className="col-sm-3 mt-3">
                                    <div className="card border-dark">
                                        <h5 className="card-header bg-dark text-white">Navigate</h5>
                                        <div className="card-body">
                                            <ul className="list-group">
                                                <li className="list-group-item border-dark">
                                                    <a href="/myaccount" onClick={myAccount}>Account Overview</a>
                                                </li>
                                                <li className="list-group-item border-dark">
                                                    <a href="/myitems" onClick={myItems}>My Items</a>
                                                </li>
                                                <li className="list-group-item border-dark">
                                                    <a href="/myaccount/orders" onClick={orders}>Orders</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-9 mt-3">
                                    <Switch>
                                        <Route exact path="/myaccount">
                                            <AccountOverview />
                                        </Route>
                                        <Route exact path="/myaccount/myitems">
                                            <MyItems hubConnection={props.hubConnection} />
                                        </Route>
                                        <Route exact path="/myaccount/orders">
                                            <Orders />
                                        </Route>
                                        <Route exact path="/myaccount/orders/:id">
                                            <ViewOrder />
                                        </Route>
                                    </Switch>
                                </div>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default MyAccount;