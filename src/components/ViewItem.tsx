import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

function ViewItem() {
    let { id } = useParams();

    return (
        <div>
            {id}
        </div>
    )
}

export default ViewItem;