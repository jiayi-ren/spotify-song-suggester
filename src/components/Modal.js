import React from 'react';
import Login from './Login.js';

const Modal = props =>{
    const {spanClick} = props

    return(
        <div className="modal">
            <div className="modal-content">
                <span className="modal-close">&times;</span>
                <Login />
            </div>
        </div>
    )
}

export default Modal;