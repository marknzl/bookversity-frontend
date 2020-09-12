import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/MyNavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Cart from './components/Cart';
import MyAccount from './components/MyAccount';
import ViewItem from './components/ViewItem';
import SellItem from './components/SellItem';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div>
          <MyNavbar />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/cart" component={Cart} />
            <Route path="/myaccount" component={MyAccount}></Route>
            <Route path="/item/:id" component={ViewItem}></Route>
            <Route path="/sellitem" component={SellItem}></Route>
            <Route path="/login" component={Login}></Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
