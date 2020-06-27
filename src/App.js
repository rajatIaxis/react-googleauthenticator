import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import GenerateComponent from './components/generate-auth.component';
import VerifyComponent from './components/verify-auth.component';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={VerifyComponent} />
        <Route path="/verify" exact component={VerifyComponent} />
        <Route path="/generate" exact component={GenerateComponent} />
      </div>
    </Router>
  );
}

export default App;
