import React, { useState } from 'react';

import { axiosWithAuth } from "../utils/axiosWithAuth";

const SongCard = props =>{
    const initialState = {
        title: "",
        artist: "",
        duration: "",
        id: props.song.id
    }

    const { title, artist, duration} = props.song
    const [isEditing, setIsEditing] = useState(false)
    const [inputValues, setInputValues] = useState(initialState)

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
        axiosWithAuth().put(`/api/favorites/${props.song.id}`, inputValues)
            .then(response => {
                console.log({ response })
                props.setSavedSongs(props.savedSongs.map(saved => {
                    return saved.id === props.song.id ? response.data : saved
                }))
            })
            .catch(err => {
                console.log({ err })
            })
    }

    const handleDelete = e => {
        e.preventDefault();
        axiosWithAuth().delete(`/api/favorites/${props.song.id}`)
            .then(response => {
                console.log({ response })
                props.setSavedSongs(props.savedSongs.filter(saved => saved.id !== props.song.id))
            })
            .catch(err => {
                console.log({ err })
            })
    }

    const handleAdd = e => {
        e.preventDefault();
        axiosWithAuth().post('/api/favorites', props.song)
            .then(response => {
                console.log({ response })
                props.setSavedSongs([
                    ...props.savedSongs,
                    response.data
                ])
            })
            .catch(err => {
                console.log({ err })
            })
    }

    return(
        <>
        <div className="song-card">
            <p>{title}</p>
            <p>{artist}</p>
            <p>{duration}</p>
            <button onClick={editing}>EDIT</button>
            <button onClick={handleDelete}>DELETE</button>
            <button onClick={handleAdd}>ADD</button>
        </div>

        {isEditing && <form onSubmit={handleEdit}>
                        <input 
                            name="title"
                            type="text"
                            value={inputValues.title}
                            onChange={handleChange}
                            placeholder="title..."
                        />
                        <input 
                            name="artist"
                            type="text"
                            value={inputValues.artist}
                            onChange={handleChange}
                            placeholder="artist..."
                        />
                        <input 
                            name="duration"
                            type="text"
                            value={inputValues.duration}
                            onChange={handleChange}
                            placeholder="duration..."
                        />
                        <button>Update</button>
                      </form>}
        </>
    )
}

export default SongCard;
