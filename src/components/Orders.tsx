import React from 'react';

function Orders() {
    return (
        <div className="card">
            <h5 className="card-header">Your orders</h5>
            <div className="card-body">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default Orders;