import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const Nav = props =>{
    return (
        <div className="nav-bar">
            <h1>Lambda Eats</h1>
            <nav className="nav-container">
                <ul className="nav-list">
                   <li className="nav-item"><NavLink className="nav-link" to='/' >Home</NavLink></li> 
                   <li className="nav-item"><NavLink className="nav-link" to='/login'>Login</NavLink></li>  
                   <li className="nav-item"><NavLink className="nav-link" to='/music'>MusicPage</NavLink></li>  
                   <li className="nav-item"><NavLink className="nav-link" to='/dashboard'>UserPage</NavLink></li>  
                </ul>
            </nav>
        </div>
    )
}

export default Nav;