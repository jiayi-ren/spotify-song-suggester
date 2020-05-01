import React, { useState, useEffect, useContext } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { SongContext } from "../context/SongContext";
import SongCard from "./SongCard";

const Dashboard = props => {

    const {savedSongs, setSavedSongs} = useContext(SongContext)

    const initialState = {
        name: ""
    }

    const [isEditing, setIsEditing] = useState(false)
    const [inputValues, setInputValues] = useState(initialState)


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

    const handleChange = e => {
        e.preventDefault();
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        })
    }

    const editing = e => {
        e.preventDefault();
        setIsEditing(true)
    }

    const handleEdit = e => {
        e.preventDefault();
        const selectedSong = savedSongs[e.target.parentElement.getAttribute("id")]
        axiosWithAuth().put(`/api/favorites/${selectedSong.favorites_id}`, {
            ...selectedSong,
                name: inputValues.name
        })
            .then(response => {
                console.log({ response })
                console.log(props.savedSongs)
                props.setSavedSongs(props.savedSongs.map(saved => {
                    return saved.favorites_id === selectedSong.favorites_id ? JSON.parse(response.config.data) : saved
                }))
                setIsEditing(false)
                setInputValues(initialState)
            })
            .catch(err => {
                console.log({ err })
            })
    }

    const handleDelete = e => {
        e.preventDefault();
        axiosWithAuth().delete(`/api/favorites/${props.song.favorites_id}`)
            .then(response => {
                console.log({ response })
                props.setSavedSongs(props.savedSongs.filter(saved => saved.favorites_id !== props.song.favorites_id))
            })
            .catch(err => {
                console.log({ err })
            })
    }

    const body = document.getElementsByTagName("body")

    body[0].className = "";
    body[0].classList.add("dashboard-bg","fade-in")

    return (
        <div className="dashboard fade-in">
        <h2>My favorites</h2>
        <div className="favorites-list">
            <ul className="favorites-head">
                <li className="favorites-name">Track</li>
                <li className="favorites-artists">Artists</li>
                <li className="favorites-duration">Duration</li>
            </ul>
            <ul className="favorites-body">

            {savedSongs && savedSongs.map((song,index) => {
                const mins = song.duration_ms? Math.floor((song.duration_ms/1000/60) << 0): 0
                const secs = song.duration_ms?("0" + Math.floor((song.duration_ms/1000) % 60)).slice(-2): "00"
                return (
                <li key={index} id={index} className="favorites-card">
                    {/* <p>{song.name}</p>
                    <p>{song.artists[0]}</p>
                    <p>{mins}:{secs}</p>
                    <button  onClick={editing}>EDIT</button>
                    <button  onClick={handleDelete}>DELETE</button>
                    {isEditing && <form onSubmit={handleEdit}>
                        <input 
                            name="name"
                            type="text"
                            value={inputValues.name}
                            onChange={handleChange}
                            placeholder="name..."
                        />
                        <button>Update</button>
                      </form>} */}
                <SongCard song={song} savedSongs={savedSongs} setSavedSongs={setSavedSongs} />
                </li>
            )
        })}
            </ul>
        </div>
        
        
        
        </div>
    )
}

export default Dashboard;