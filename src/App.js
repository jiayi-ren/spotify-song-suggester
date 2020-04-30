import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import './App.css';
import icon from "../src/assests/images/android-chrome-192x192.png";

import { SongContext } from "./context/SongContext";
import HomePage from './components/HomePage.js';
import Login from './components/Login.js';
import Callback from './components/protected/Callback';
import Dashboard from './components/Dashboard';
import MusicPage from './components/MusicPage';

function App() {
  const [isSearching, setIsSearching] = useState(false)
  const [savedSongs, setSavedSongs] = useState([]);

  return (
    <div className="App">

      <Router>
          <div className="nav-bar">
            <nav className="nav">
              <span>
              <img src={icon} alt="spotify song 5"className="nav-icon"/>
              <h2>Spotify Song 5</h2>
              </span>
              <ul className="nav-list">
                <li className="nav-item"><NavLink to="/" className="navLink">Home</NavLink></li>
                <li className="nav-item"><NavLink to="/login"  className="navLink">Login</NavLink></li>
                <li className="nav-item"><NavLink to="/music" onClick={() => setIsSearching(true)} className="navLink">Music</NavLink></li>
                <li className="nav-item"><NavLink to="/dashboard" onClick={() => setIsSearching(false)} className="navLink">Dashboard</NavLink></li>
              </ul>
            </nav>
          </div>
          
          <SongContext.Provider value = {{ isSearching, setIsSearching, savedSongs, setSavedSongs }}>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route path="/callback/:token" component={Callback} />
            <ProtectedRoute exact path="/music" component={MusicPage} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          </SongContext.Provider>

      </Router>
    </div>
  )
}

export default App;
