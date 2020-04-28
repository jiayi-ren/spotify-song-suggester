import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage.js';
import MusicPage from './components/MusicPage';
import UserPage from './components/UserPage.js';

function App() {

  const [savedList, setSaveList] = useState([])

  const addToSavedList = song =>{
    setSaveList([...savedList, song])
  }

  return (
    <div>
      {
        savedList.map((song,index) =>{
          return(
            <div key={index}>
              <p>{song}</p>
            </div>
          )
        })
      } 
      <HomePage />
      {/* <MusicPage addToSavedList={addToSavedList}/> */}
      {/* <UserPage savedList={savedList}/> */}
    </div>

  )
}

export default App;
