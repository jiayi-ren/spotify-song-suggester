import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import './App.css';

import { SongContext } from "./context/SongContext";
import HomePage from './components/HomePage.js';
import Login from './components/Login.js';
import Callback from './components/protected/Callback';
import SearchList from './components/SearchList';
import SavedList from './components/SavedList';

function App() {
  const [isSearching, setIsSearching] = useState(false)

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
            <NavLink to="/music" onClick={() => setIsSearching(true)}>
              <h3 className="navLink">Search</h3>
            </NavLink>
            <NavLink to="/dashboard" onClick={() => setIsSearching(false)}>
              <h3 className="navLink">Saved</h3>
            </NavLink>
          </nav>
          
          <SongContext.Provider value = {{ isSearching, setIsSearching }}>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route path="/callback/:token" component={Callback} />
            <ProtectedRoute exact path="/music" component={SearchList} />
            <ProtectedRoute exact path="/dashboard" component={SavedList} />
          </SongContext.Provider>

      </Router>
    </div>
  )
}

export default App;
