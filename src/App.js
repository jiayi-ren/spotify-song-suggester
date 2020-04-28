import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import SongsPage from "./components/songs/SongPage";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <NavLink to="/">
          <h3 className="navLink">Home</h3>
          </NavLink>
          <NavLink to="/songs-page">
            <h3 className="navLink">Search</h3>
          </NavLink>
        </nav>

          <Route exact path="/songs-page" component={SongsPage} />

      </Router>
    </div>
  );
}

export default App;
