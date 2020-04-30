import React, { useState, useEffect, useContext } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { SongContext } from "../context/SongContext";
import SongCard from "./SongCard.js";

const MusicPage= props => {
    const initialValue = ""

    const [search, setSearch] = useState(initialValue);
    const [searchedSongs, setSearchedSongs] = useState([]);
    const [togglePage, setTogglePage] = useState(false);
    const [toggleSuggest, setToggleSuggest] = useState(false);
    const [suggestBtnText, setSuggestBtnText] = useState("Ready to see our Recommendation?")
    const [loginError, setLoginError] = useState("")
    const {savedSongs, setSavedSongs} = useContext(SongContext)
    const [recommended, setRecommended] = useState([]);

    const getRecommended = e => {
        e.preventDefault();
        axiosWithAuth().post('https://cors-anywhere.herokuapp.com/http://spotify5.herokuapp.com/predict', JSON = savedSongs)
            .then(response => {
                console.log(response, "Got the recommended data")
                setRecommended(response.data)
            })
            .catch(err => {
                console.log({ err }, "There was an error posting to Recommended")
                
            })
    }

    ////// hide search section when recommend songs ///////
    const toggle = e => {
        if(togglePage === false){
            // getRecommended()
            setTogglePage(true)
            setSuggestBtnText("Search for more songs")
        }else{
            setTogglePage(false)
            setSuggestBtnText("Ready to see our Recommendation?")
        }
    }

    const getSearch = song =>{
        axiosWithAuth().get(`/api/spotify/search?q=${song}`)
        .then(res =>{
            setSearchedSongs(res.data)
            setToggleSuggest(true)
        })
        .catch(err =>{
            setLoginError("Sorry, our app excels with Customized Recommendation. Please Sign-in.")
            setToggleSuggest(false)
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
        <div className="music fade-in">
            {/* Search Section */}
            <div className="search">
                {toggleSuggest &&
                    <div className="suggest-btn-wrapper">
                        <p>{suggestBtnText}</p>
                        <button className="suggest-btn" onClick={toggle}>Toggle Search results</button>
                    </div>
                }
                <h2>Some Attractive texts</h2>
                {loginError}
                <form onSubmit={handleSubmit} >
                    <input 
                        name="search"
                        type="text"
                        value={search}
                        onChange={handleChange}
                        placeholder="Enter a track..."
                        className="search-box"
                    />
                    <button className="search-btn" onClick={handleSubmit}>Search</button>
                </form>
            </div>

            {!togglePage &&
                <div className="search-results">
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
                    <button className="suggest-btn" onClick={getRecommended}>Get Recommended</button>
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