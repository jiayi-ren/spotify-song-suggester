import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';
import Nav from './components/Nav.js';
import HomePage from './components/HomePage.js';
import MusicPage from './components/MusicPage';
import UserPage from './components/UserPage.js';
import Login from './components/Login.js';


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
          <Nav />
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/music">
            <MusicPage addToSavedList={addToSavedList}/>  
          </Route>
          <Route exact path="/dashboard">
            <UserPage savedList={savedList}/>
          </Route>

      </Router>
    </div>
  )
}

export default App;
