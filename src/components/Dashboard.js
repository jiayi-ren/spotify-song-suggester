import React, { useState, useEffect } from "react";

import SongCard from "./SongCard";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Dashboard = props => {

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
        <div className="dashboard">
            <h2>My favorites</h2>
            {savedSongs && savedSongs.map((song,index) => {
                return (
                    <div key={index}>
                    <SongCard song={song} savedSongs={savedSongs} setSavedSongs={setSavedSongs} />
                    </div>
                )
            })}
        </div>
    )
}

export default Dashboard;