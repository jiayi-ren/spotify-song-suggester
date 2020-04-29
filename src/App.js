import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import './App.css';

import HomePage from './components/HomePage.js';
import Login from './components/Login.js';
import SignUp from './components/SignUp';
import Callback from './components/protected/Callback';
import SearchList from './components/newFiles/SearchList';
import SavedList from './components/newFiles/SavedList';


function App() {

  const [savedList, setSaveList] = useState([])

  const addToSavedList = song =>{
    setSaveList([...savedList, song])
  }

  return (
    <div className="App">
      {
        savedList.map((song,index) =>{
          return(
            <div key={index}>
              <p>{song}</p>
            </div>
          )
        })
      } 
      <Router>
          <nav>
            <NavLink to="/">
              <h3 className="navLink">Home</h3>
            </NavLink>
            <NavLink to="/login">
              <h3 className="navLink">Login</h3>
            </NavLink>
            <NavLink to="/music">
              <h3 className="navLink">Search</h3>
            </NavLink>
            <NavLink to="/dashboard">
              <h3 className="navLink">Saved</h3>
            </NavLink>
          </nav>
          
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route path="/callback/:token" component={Callback} />
          <ProtectedRoute exact path="/music" component={SearchList} />
          <ProtectedRoute exact path="/dashboard" component={SavedList} />

      </Router>
    </div>
  )
}

export default App;
