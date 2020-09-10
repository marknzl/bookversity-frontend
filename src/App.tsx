import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Alert>This is a button</Alert>
        <Button>Test!</Button>

        <form>
          <input type="file" accept="image/*"></input>
        </form>
      </header>
    </div>
  );
}

export default App;
