import React from 'react';
import IYourOrdersItemRowProps from '../../types/Props/IYourOrdersItemRowProps';
import IOrder from '../../types/IOrder';
import { useHistory } from 'react-router-dom';

function YourOrdersItemRow(props: IYourOrdersItemRowProps) {
    let order: IOrder = props.order;
    let orderHref = `/myaccount/orders/${order.id}`
    let history = useHistory();

    const navigate = (e: any) => {
        e.preventDefault();
        let orderId = e.target.id;

        history.push('/myaccount/orders/' + orderId);
    };

    return (
        <tr key={order.id}>
            <th scope="row"><a href={orderHref} onClick={navigate} id={String(order.id)}>{order.id}</a></th>
            <td>${order.total}</td>
            <td>{new Date(Date.parse(order.transactionDate)).toLocaleDateString("en-us")}</td>
        </tr>
    )
}

export default YourOrdersItemRow;