import React, { useState, useEffect } from "react";

import SongCard from "./SongCard";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const SavedList = props => {

    const [savedSongs, setSavedSongs] = useState([]);

    const [recommended, setRecommended] = useState([]);

    const getRecommended = e => {
        e.preventDefault();
        axiosWithAuth().post('https://cors-anywhere.herokuapp.com/http://spotify5.herokuapp.com/predict', savedSongs)
            .then(response => {
                console.log({response}, "This is data from the Recommended")
                console.log(response.data)
                setRecommended([
                    ...recommended,
                    response.data
                ])
            })
            .catch(err => {
                console.log({ err }, "There was an error posting to Recommended")
            })
    }

    const fetchData = () => {
        axiosWithAuth().get('/api/favorites')
            .then(response => {
                console.log({ response }, "this is the saved list data")
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
        <button onClick={getRecommended} >Get Recommended</button>
        {recommended && recommended.map((song,index) => {
            return (
                <div key={index}>
                <SongCard song={song} recommended={recommended} setRecommended={setRecommended} />
                </div>
            )
        })}
        </>
    )
}

export default SavedList;