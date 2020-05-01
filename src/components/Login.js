import React, { useState } from 'react';
import styled from 'styled-components';
import icon from '../assests/images/Spotify_Icon_RGB_White.png';
import SignUp from './SignUp';

const StyledLink = styled.a`
    width: 320px;
    color:#FFFFFF;
    font-size: 18px;
    text-decoration: none;
    background-color:#1DB954;
    padding:15px 45px;
    border-radius:500px;
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: #1ed760;
        transition: all 0.3s ease-in-out;
    }
`

const StyledLoadMsg = styled.p`
    color: red;
    font-size: 15px;
    margin: 0 0 4px;
`

const url = 'https://frontend.spotify-song-5.now.sh/callback/'
// const url = 'http://localhost:3000/callback/' //testgit 


const Login = props =>{

    const loginLink = `https://spotify-song-api.herokuapp.com/api/auth/spotify?redirect_url=${url}`

    const [loadMsg, setLoadMsg] = useState("")

    const clickhandler = e =>{
        setLoadMsg("⏳...hang tight while we transfer you...⏳")
    }

    const body = document.getElementsByTagName("body")

    body[0].className = "";
    body[0].classList.add("login-bg","fade-in")

    return(
        <div className="login-container fade-in">
            <div className="login">
                <div className="spotify-login">
                    <div className="spotify-login-wrapper">
                    <StyledLoadMsg>{loadMsg}</StyledLoadMsg>
                    <h3>Already have a Spotify Account?</h3>
                        <StyledLink href={loginLink} onClick={clickhandler}>
                            Log in with Spotify&nbsp;
                            <img src={icon} className="icon" alt="Spotify icon" />
                        </StyledLink>

                    <h3>Don't have a Spotify account yet?</h3>
                        <StyledLink href='https://www.spotify.com/us/signup/' onClick={clickhandler}>
                            Sign Up Here!
                        </StyledLink>
                    </div>
                </div>
                <div className="app-login">
                    <SignUp />
                </div>
            </div>
        </div>
    )
}

export default Login;