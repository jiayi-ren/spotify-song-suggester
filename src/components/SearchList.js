import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth.js";
import SongCard from "./SongCard.js";


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
        </form>

        {searchedSongs && searchedSongs.map(song => {
            return <SongCard key={song.id} song={song} />
        })}
        </>
    )
}

export default SearchList;