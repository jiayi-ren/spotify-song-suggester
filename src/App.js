import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';
import HomePage from './components/HomePage.js';
import SignUp from './components/SignUp.js';
import Login from './components/Login.js';
import DummyPage from './components/DummyPage';
import Callback from './components/Callback';
// import SpotifyAccountGenerator from './components/SpotifyAccount.js';

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <NavLink to="/">
            <h3 className="navLink">Home</h3>
          </NavLink>
          <NavLink to="/login">
            <h3 className="navLink">Login</h3>
          </NavLink>
          <NavLink to="/sign-up">
            <h3 className="navLink">Sign Up</h3>
          </NavLink>
          <NavLink to="/Dummy">
            <h3 className="navLink">DummyPage</h3>
          </NavLink>
        </nav>

          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route path="/callback" component={Callback} />
          <ProtectedRoute exact path="/Dummy" component={DummyPage} />
      </Router>
    </div>
  );
}

export default App;
