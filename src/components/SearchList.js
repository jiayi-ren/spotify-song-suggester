import React, { useState, useEffect } from "react";
import SongCard from "./SongCard.js";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import { SongContext } from "../context/SongContext";


const SearchList = props => {
    const initialValue = ""

    const [search, setSearch] = useState(initialValue);
    const [searchedSongs, setSearchedSongs] = useState([]);

    const getSearch = song =>{
        axiosWithAuth().get(`/api/spotify/search?q=${song}`)
        .then(res =>{
            setSearchedSongs(res.data)
        })
        .catch(err =>{
            console.log(err)
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
        <>
        <h2>Search Songs</h2>
        <form onSubmit={handleSubmit} >
            <input 
                name="search"
                type="text"
                value={search.input}
                onChange={handleChange}
                placeholder="search..."
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
        </>
    )
}

export default SearchList;