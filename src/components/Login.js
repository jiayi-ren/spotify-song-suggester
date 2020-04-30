import React, { useState } from 'react';
import styled from 'styled-components';
import icon from '../assests/images/Spotify_Icon_RGB_White.png';
import SignUp from './SignUp';

const StyledButton = styled.button`
    width: 320px;
    padding:15px 45px;
    border-radius:500px;
    background-color:#1DB954;
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: #1ed760;
        transition: all 0.3s ease-in-out;
    }
`

const StyledLink = styled.a`
    color:#FFFFFF;
    font-size: 18px;
`

const StyledLoadMsg = styled.p`
    color: red;
    font-size: 15px;
    margin: 0 0 4px;
`

const url = 'https://frontend.spotify-song-5.now.sh/callback/'

const Login = props =>{

    const loginLink = `https://spotify-song-api.herokuapp.com/api/auth/spotify?redirect_url=${url}`

    const [loadMsg, setLoadMsg] = useState("")

    const clickhandler = e =>{
        setLoadMsg("⏳...sit tight while we transfer you...⏳")
    }

    return(
        <div className="login-container">
            <div className="login">
                <div className="spotify-login">
                    <div>
                    <StyledLoadMsg>{loadMsg}</StyledLoadMsg>
                    <h3>Already have a Spotify Account?</h3>
                    <StyledButton className="sign-in-btn">
                        <StyledLink href={loginLink} onClick={clickhandler}>
                            Log in with Spotify&nbsp;
                            <img src={icon} className="icon" alt="Spotify icon" />
                        </StyledLink>
                    </StyledButton>
                    <h3>Don't have a Spotify account yet?</h3>
                    <StyledButton className="sign-in-btn" onClick={clickhandler}>
                        <StyledLink href='https://www.spotify.com/us/signup/'>Sign Up Here!</StyledLink>
                    </StyledButton>
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