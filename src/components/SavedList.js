import React, { useState, useEffect } from "react";

import SongCard from "./SongCard";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const SavedList = props => {

    const [savedSongs, setSavedSongs] = useState([]);

    const fetchData = () => {
        axiosWithAuth().get('/api/favorites')
            .then(response => {
                console.log({ response })
                setSavedSongs(response.data)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
        <h2>Saved Songs</h2>
        {savedSongs && savedSongs.map((song,index) => {
            return (
                <div key={index}>
                <SongCard song={song} savedSongs={savedSongs} setSavedSongs={setSavedSongs} />
                </div>
            )
        })}
        </>
    )
}

export default SavedList;