import React, { useState, useEffect, useContext } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { SongContext } from "../context/SongContext";
import SongCard from "./SongCard";

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

    const body = document.getElementsByTagName("body")

    body[0].className = "";
    body[0].classList.add("dashboard-bg","fade-in")

    return (
        <div className="dashboard fade-in">
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