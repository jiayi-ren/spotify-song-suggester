import React from 'react';
import Login from './Login.js';
import SignUp from './SignUp.js';

const Modal = props =>{

    const {spanClick} = props

    return(
        <div className="modal">
            <div className="modal-content">
                <span className="modal-close" onClick={spanClick}>&times;</span>
                <Login />
                <h3>Just Wanna try out our app?</h3>
                <SignUp />
            </div>
        </div>
    )
}

export default Modal;