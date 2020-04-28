import React from 'react';
import Modal from './Modal.js';
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
            {/* <Nav /> */}
            <button name="modalButton" onClick={modalClick}>Login</button>
            <Modal spanClick={spanClick}/>
        </div>
    )
}

export default HomePage;