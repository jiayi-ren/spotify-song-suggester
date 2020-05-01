import React, { useState, useEffect, useContext } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";
import { SongContext } from "../context/SongContext";
import SongCard from "./SongCard.js";
import FeaturedSong from "./FeaturedSong";
import fullheart from "../assests/icons/redheart.png";

const MusicPage= props => {
    const initialValue = ""

    const [search, setSearch] = useState(initialValue);
    const [searchedSongs, setSearchedSongs] = useState([]);
    const [togglePage, setTogglePage] = useState(false);
    const [toggleSearchResults, setToggleSearchResults] = useState(false);
    const [togglePanel, setTogglePanel] = useState(false)
    const [toggleSuggest, setToggleSuggest] = useState(false);
    const [suggestBtnText, setSuggestBtnText] = useState("Ready to see our Recommendation?")
    const [loginError, setLoginError] = useState("")
    const {savedSongs, setSavedSongs} = useContext(SongContext)
    const [recommended, setRecommended] = useState([]);

    console.log(savedSongs);
    const getRecommended = e => {
        e.preventDefault();
        console.log(savedSongs)
        const newRecommended = savedSongs.map((song) => {
                delete song.artists
        })
        console.log(newRecommended, "this is new recommended")
        axiosWithAuth().post('https://cors-anywhere.herokuapp.com/http://spotify5.herokuapp.com/predict', savedSongs)
            .then(response => {
                console.log(response, "Got the recommended data")
                setRecommended(response.data)
            })
            .catch(err => {
                console.log({ err }, "There was an error posting to Recommended")
                
            })
    }

    const handleAdd = e => {
        const selectedSong = searchedSongs[e.target.parentElement.parentElement.rowIndex-1]
        const heart = e.target
        heart.style.backgroundImage = `url('${fullheart}')`
        console.log(heart)

        axiosWithAuth().post('/api/favorites', selectedSong)
            .then(response => {
                console.log({ response },"handleAdd Works")
                setSavedSongs([
                    ...savedSongs,
                    response.data
                ])
                
            })
            .catch(err => {
                console.log(err)
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

    const toggleFeatured = e => {
        if(togglePanel === false){
            setTogglePanel(true)
        }else{
            setTogglePanel(false)
        }
    }

    const getSearch = song =>{
        axiosWithAuth().get(`/api/spotify/search?q=${song}`)
        .then(res =>{
            setSearchedSongs(res.data)
            setToggleSearchResults(true)
            setToggleSuggest(true)
        })
        .catch(err =>{
            setLoginError("Sorry, our app excels with Customized Recommendation. Please Sign-in.")
            setToggleSuggest(false)
            setToggleSearchResults(true)
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

    const body = document.getElementsByTagName("body")

    body[0].className = "";
    body[0].classList.add("music-bg","fade-in")

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
                <h2>Give us your favourite track and ❤️ into your playlist<br/> We will surprise you with our recommendations! </h2>
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

            {toggleSearchResults &&
                <table className="search-results-table">
                    <thead>
                    <tr>
                        <td className="title">Track</td>
                        <td className="title"></td>
                        <td className="title">Artist</td>
                        <td className="title"> Duration</td>
                    </tr>
                    </thead>
                    <tbody>
                    {searchedSongs && searchedSongs.map((song,index) => {
                        const mins = song.duration_ms? Math.floor((song.duration_ms/1000/60) << 0): 0
                        const secs = song.duration_ms?("0" + Math.floor((song.duration_ms/1000) % 60)).slice(-2): "00"
                        return (
                            <tr className="table-body" key={index}  onClick={toggleFeatured}>
                                <td className="first-column">{song.name}</td>
                                <td><div className="list-add" onClick={handleAdd}></div></td>
                                <td>{song.artists[0]}</td>
                                <td>{mins}:{secs}</td>
                                {/* {togglePanel &&
                                <div classe="song-visual" onClick={toggle}><FeaturedSong details={song}/></div>
                                } */}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
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