import React, { useState, useEffect } from "react";

import SongCard from "../SongCard";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

const NewSavedList = props => {

    const sample = [
        {id: 0, title: 'title 1', artist: 'artist 1', duration: 'duration 1'},
        {id: 1, title: 'title 2', artist: 'artist 2', duration: 'duration 2'},
        {id: 2, title: 'title 3', artist: 'artist 3', duration: 'duration 3'},
        {id: 3, title: 'title 4', artist: 'artist 4', duration: 'duration 4'}
    ]

    const [savedSongs, setSavedSongs] = useState([]);

    useEffect(() => {
        setSavedSongs(sample)
    }, [])

    // const fetchData = () => {
    //     axiosWithAuth().get('url')
    //         .then(response => {
    //             console.log({ response })
    //             setSavedSongs(response.data)
    //         })
    // }

    // useEffect(() => {
    //     fetchData()
    // }, [])

    return (
        <>
        {savedSongs && savedSongs.map(song => {
            return <SongCard key={song.id} song={song} savedSongs={savedSongs} setSavedSongs={setSavedSongs} />
        })}
        </>
    )
}

export default NewSavedList;