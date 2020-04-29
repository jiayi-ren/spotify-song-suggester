import React, { useState } from 'react';

import { axiosWithAuth } from "../utils/axiosWithAuth";

const SongCard = props =>{
    const initialState = {
        name: "",
        artists: "",
        album_name: "",
        id: props.song.id
    }

    const { name, artists, album_name} = props.song
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
        axiosWithAuth().put(`/api/favorites/${props.song.favorites_id}`, {
            ...props.song,
                name: inputValues.name
        })
            .then(response => {
                console.log({ response })
                props.setSavedSongs(props.savedSongs.map(saved => {
                    return saved.id === props.song.favorites_id ? response.data : saved
                }))
            })
            .catch(err => {
                console.log({ err })
                console.log(inputValues.name)
                console.log(props.song.name)
                console.log(props.song.id)
                console.log(props.song.album_name)
                console.log(props.song.energy)
                console.log(props.song)
            })
    }

    const handleDelete = e => {
        e.preventDefault();
        console.log('banana')
        axiosWithAuth().delete(`/api/favorites/${props.song.favorites_id}`)
            .then(response => {
                console.log('strawberry')
                console.log({ response })
                props.setSavedSongs(props.savedSongs.filter(saved => saved.id !== props.song.favorites_id))
            })
            .catch(err => {
                console.log({ err })
                console.log('orange')
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
            <p>{name}</p>
            <p>{artists}</p>
            <p>{album_name}</p>
            <button onClick={editing}>EDIT</button>
            <button onClick={handleDelete}>DELETE</button>
            <button onClick={handleAdd}>ADD</button>
        </div>

        {isEditing && <form onSubmit={handleEdit}>
                        <input 
                            name="name"
                            type="text"
                            value={inputValues.name}
                            onChange={handleChange}
                            placeholder="name..."
                        />
                        {/* <input 
                            name="artists"
                            type="text"
                            value={inputValues.artists}
                            onChange={handleChange}
                            placeholder="artists..."
                        />
                        <input 
                            name="album_name"
                            type="text"
                            value={inputValues.album_name}
                            onChange={handleChange}
                            placeholder="album name..."
                        /> */}
                        <button>Update</button>
                      </form>}
        </>
    )
}

export default SongCard;
