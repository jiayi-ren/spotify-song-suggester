import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";
import SongCard from "./SongCard.js";

import { SongContext } from "../context/SongContext";


const MusicPage= props => {
    const initialValue = ""

    const [search, setSearch] = useState(initialValue);
    const [searchedSongs, setSearchedSongs] = useState([]);
    const [togglePage, setTogglePage] = useState(false);
    const [loginError, setLoginError] = useState("")

    const toggle = e => {
        if(togglePage === false){
            setTogglePage(true)
        }else{
            setTogglePage(false)
        }
    }

    const getSearch = song =>{
        axiosWithAuth().get(`/api/spotify/search?q=${song}`)
        .then(res =>{
            setSearchedSongs(res.data)
        })
        .catch(err =>{
            setLoginError("Sorry, our app excels with Customized Recommendation. Please Sign-in.")
        })
    } 

    const handleChange = e => {
        e.preventDefault();
        setSearch(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        getSearch(search)
    }

    return (
        <div>
            {/* Search Section */}
            {!togglePage &&
                <div className="search">
                    <h2>Search Songs</h2>
                    {loginError}
                    <form onSubmit={handleSubmit} >
                        <input 
                            name="search"
                            type="text"
                            value={search}
                            onChange={handleChange}
                            placeholder="Enter a track..."
                        />
                    </form>

                    {searchedSongs && searchedSongs.map((song,index) => {
                        return (
                            <div key={index}>
                            <SongCard song={song} /> 
                            </div>
                        )
                    })}
                </div>
            }
            {/* Suggester Section */}
            {/* TO DO */}
            {togglePage &&
                <div className="suggester">

                    
                </div>
            }
        </div>
    )
}

export default MusicPage;