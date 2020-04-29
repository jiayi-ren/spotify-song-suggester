import React from 'react';
import {NavLink} from 'react-router-dom';
// import Modal from './Modal.js';
// import Nav from './Nav.js';

const HomePage = props =>{

    const modalClick = event =>{
        if(event.target.name === "modalButton"){
            const modal = document.querySelector(".modal")
            modal.style.display = "block"
        }
    }

    const spanClick = event =>{
        const modal = document.querySelector(".modal")
        modal.style.display = "none"
    }

    window.onclick = function(event) {
        const modal = document.querySelector(".modal")
        if (event.target == modal) {
            modal.style.display = "none";
        }
      }

    return (
        <div className="home-container">
            <h1>Spotify Song Suggester</h1>
        </div>
    )
}

export default HomePage;