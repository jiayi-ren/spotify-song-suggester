import React, { useState, useEffect, useContext } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import SongCard from "./SongCard";
import { SongContext } from "../context/SongContext"

const Dashboard = props => {

    const {savedSongs, setSavedSongs} = useContext(SongContext)

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