import React from 'react';
import IItemsForSaleProps from '../../types/Props/IItemsForSaleProps';

function ItemsForSale(props: IItemsForSaleProps) {
    return (
        <div className="col-sm-9">
            <div className="container">
                <div className="row">
                    <div className="card mt-3">
                        <h5 className="card-header">Items for sale</h5>
                        <div className="card-body">
                            <div className="container">
                                <div className="row">
                                    {props.items}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemsForSale;