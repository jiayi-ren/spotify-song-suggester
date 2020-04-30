import React, { useState, useEffect } from "react";

import SongCard from "./SongCard";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Dashboard = props => {

    const [savedSongs, setSavedSongs] = useState([]);

    // const [recommended, setRecommended] = useState([]);

    // const getRecommended = e => {
    //     e.preventDefault();
    //     axiosWithAuth().post('http://spotify5.herokuapp.com/predict', data = savedList)
    //         .then(response => {
    //             console.log({response}, "getRecommend Works")
    //             console.log(response.data)
    //             setRecommended([
    //                 ...recommended,
    //                 response.data
    //             ])
    //         })
    //         .catch(err => {
    //             console.log({ err }, "There was an error posting to Recommended")
    //         })
    //     axiosWithAuth().get('http://spotify5.herokuapp.com/predict')
    //         .then(response => {
    //             console.log({ response })
    //             setRecommended(response.data)
    //         })
    //         .catch(err => {
    //             console.log({ err}, "there was an error posting Recommended")
    //         })
    // }

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
        <div className="dashboard">
        <h2>My favorites</h2>
        {savedSongs && savedSongs.map((song,index) => {
            return (
                <div key={index}>
                <SongCard song={song} savedSongs={savedSongs} setSavedSongs={setSavedSongs} />
                </div>
            )
        })}
        {/* <button onClick={getRecommended} >Get Recommended</button>
        {recommended && recommended.map((song,index) => {
            return (
                <div key={index}>
                <SongCard song={song} recommended={recommended} setRecommended={setRecommended} />
                </div>
            )
        })} */}
        </div>
    )
}

export default Dashboard;