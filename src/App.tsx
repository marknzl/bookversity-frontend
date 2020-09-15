import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/MyNavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Cart from './components/Cart';
import MyAccount from './components/MyAccount';
import ViewItem from './components/ViewItem';
import SellItem from './components/SellItem';
import Login from './components/Login';
import Register from './components/Register';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

function App() {
  const [loggedIn, setLoggedInStatus] = useState<boolean>(false);
  const [hubConnection, setHubConnection] = useState<HubConnection>();

  useEffect(() => {
    if (localStorage.getItem("jwt") !== null) {
      setLoggedInStatus(true);
    }
  }, []);

  useEffect(() => {
    const createHubConnection = async () => {
        const conn = new HubConnectionBuilder().withUrl("https://bookversity-backend.azurewebsites.net/refreshHub")
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build()

        try {
            await conn.start();
            console.log("Real-time connection to server established.")
        } catch (error) {
            console.log("Couldn't establish a real-time connection to the server!");
        }

        setHubConnection(conn);
    };

    createHubConnection();
  }, []);

  return (
    <Router>
      <div>
          <MyNavbar setLoggedInStatus={(ls: boolean) => setLoggedInStatus(ls)} loggedIn={loggedIn} />
          <Switch>
            <Route path="/" exact>
              <HomePage hubConnection={hubConnection}></HomePage>
            </Route>
            <Route path="/cart">
              <Cart hubConnection={hubConnection}/>
            </Route>
            <Route path="/myaccount">
              <MyAccount hubConnection={hubConnection} />
            </Route>
            <Route path="/item/:id">
              <ViewItem hubConnection={hubConnection}/>
            </Route>
            <Route path="/sellitem">
              <SellItem hubConnection={hubConnection}/>
            </Route>
            <Route path="/login">
              <Login setLoggedInStatus={(ls: boolean) => setLoggedInStatus(ls)}/>
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
