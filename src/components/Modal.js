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
                <SignUp />
            </div>
        </div>
    )
}

export default Modal;