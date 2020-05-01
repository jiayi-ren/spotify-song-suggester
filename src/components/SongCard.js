import React, { useState, useContext } from 'react';

import { axiosWithAuth } from "../utils/axiosWithAuth";
import FeaturedSong from './FeaturedSong';

import { SongContext } from "../context/SongContext";

const SongCard = props =>{

    const {isSearching, setIsSearching} = useContext(SongContext)

    const initialState = {
        name: "",
        artists: [],
        duration: "",
        id: props.song.id
    }

    const { name, artists, duration_ms} = props.song
    const [isEditing, setIsEditing] = useState(false)
    const [inputValues, setInputValues] = useState(initialState)
    const [togglePanel, setTogglePanel] = useState(false)

    const mins = duration_ms? Math.floor((duration_ms/1000/60) << 0): 0
    const secs = duration_ms?("0" + Math.floor((duration_ms/1000) % 60)).slice(-2): "00"

    const toggle = e => {
        if(togglePanel === false){
            setTogglePanel(true)
        }else{
            setTogglePanel(false)
        }
    }

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
        axiosWithAuth().put(`/api/favorites/${props.song.favorites_id}`, {
            ...props.song,
                name: inputValues.name
        })
            .then(response => {
                console.log({ response })
                props.setSavedSongs(props.savedSongs.map(saved => {
                    return saved.favorites_id === props.song.favorites_id ? JSON.parse(response.config.data) : saved
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

    const handleAdd = e => {
        e.preventDefault();
        axiosWithAuth().post('/api/favorites', props.song)
            .then(response => {
                console.log({ response },"handleAdd Works")
                props.setSavedSongs([
                    ...props.savedSongs,
                    response.data
                ])
            })
            .catch(err => {
                console.log({ err })
                console.log(props.song.artists)
            })
    }

    return(
        <div className="song-card" >
        {<div className="song-card-container">
            <div className="song-card-wrapper">
                <div className="favorites-name">{name}
                {!isSearching && 
                <div className="favorites-buttons">
                    <div className="list-edit" onClick={editing}></div>
                    <div className="list-delete" onClick={handleDelete}></div>
                    <div className="features" onClick={toggle}></div>
                </div>
                }
                </div>
                <div className="favorites-song-artists">
                {artists.map((artist, index) =>{
                    if(index<artists.length){
                        return <div key={index}>{artist},</div>
                    }else{
                        return <div key={index}>{artist}</div>
                    }
                })}
                </div>
                <div className="favorites-duration">{mins}:{secs}</div>
            </div>
            {togglePanel &&
                <div className="song-visual" onClick={toggle}><FeaturedSong details={props.song}/></div>
            }
        </div>
        }
            
            
            {isSearching && <button className="songButton" onClick={handleAdd}>ADD</button>}

            {isEditing && <form onSubmit={handleEdit}>
                        <input 
                            name="name"
                            type="text"
                            value={inputValues.name}
                            onChange={handleChange}
                            placeholder="name..."
                        />
                        <button>Update</button>
                      </form>}
        </div>
    )
}

export default SongCard;
