import React from 'react';
import icon from '../assests/images/Spotify_Icon_RGB_Green.png'

const url = 'http://localhost:3000/callback/'

const Login = props =>{

    const loginLink = `https://spotify-song-api.herokuapp.com/api/auth/spotify?redirect_url=${url}`

    return(
        <div>
            <h3>Already have a Spotify Account?</h3>
            <button className="sign-in-btn">
                <a href={loginLink}>
                    Sign in with Spotify&nbsp;
                    <img src={icon} className="icon" alt="Spotify icon" />
                </a>
            </button>

            <h3>Don't have a Spotify account yet?</h3>
            <button className="sign-in-btn">
                <a href='https://www.spotify.com/us/signup/'>Sign up Here!</a>
            </button>
        </div>
    )
}

export default Login;