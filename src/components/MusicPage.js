import React, { useState, useEffect, useContext } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { SongContext } from "../context/SongContext";
import SongCard from "./SongCard.js";

const MusicPage= props => {
    const initialValue = ""

    const [search, setSearch] = useState(initialValue);
    const [searchedSongs, setSearchedSongs] = useState([]);
    const [togglePage, setTogglePage] = useState(false);
    const [loginError, setLoginError] = useState("")
    const {savedSongs, setSavedSongs} = useContext(SongContext)
    const [recommended, setRecommended] = useState([]);

    const getRecommended = e => {
        e.preventDefault();
        axiosWithAuth().post('https://cors-anywhere.herokuapp.com/http://spotify5.herokuapp.com/predict', savedSongs)
            .then(response => {
                console.log(response)
                
            })
            .catch(err => {
                console.log({ err }, "There was an error posting to Recommended")
                
            })
    }

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
                        <button>Search</button>
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
                    <button onClick={getRecommended} >Get Recommended</button>
                    {recommended && recommended.map((song,index) => {
                        return (
                            <div key={index}>
                                <SongCard song={song} recommended={recommended} setRecommended={setRecommended} />
                            </div>
                        )
                    })}
                    
                </div>
            }
        </div>
    )
}

export default MusicPage;