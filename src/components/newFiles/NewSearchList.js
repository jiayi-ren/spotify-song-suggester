import React, { useState, useEffect } from "react";

import SongCard from "../SongCard";

const NewSearchList = props => {
    const initialValue = {
        input: ""
    }

    const sample = [
        {id: 0, title: 'title 1', artist: 'artist 1', duration: 'duration 1'},
        {id: 1, title: 'title 2', artist: 'artist 2', duration: 'duration 2'},
        {id: 2, title: 'title 3', artist: 'artist 3', duration: 'duration 3'},
        {id: 3, title: 'title 4', artist: 'artist 4', duration: 'duration 4'}
    ]

    const [search, setSearch] = useState(initialValue);
    const [searchedSongs, setSearchedSongs] = useState([]);

    const handleChange = e => {
        e.preventDefault();
        setSearch({
            ...search,
            input: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setSearchedSongs(sample)
    }

    return (
        <>
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

export default NewSearchList;