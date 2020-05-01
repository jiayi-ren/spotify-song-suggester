import React from 'react';

const HomePage = props =>{

    const body = document.getElementsByTagName("body")

    body[0].className = "";
    body[0].classList.add("home-bg","fade-in")

    return (
        <div className="home-container fade-in">
        </div>
    )
}

export default HomePage;