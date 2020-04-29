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

    const mins = Math.floor((duration_ms/1000/60) << 0)
    const secs = ("0" + Math.floor((duration_ms/1000) % 60)).slice(-2)

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
        console.log('banana')
        axiosWithAuth().delete(`/api/favorites/${props.song.favorites_id}`)
            .then(response => {
                console.log('strawberry')
                console.log({ response })
                props.setSavedSongs(props.savedSongs.filter(saved => saved.favorites_id !== props.song.favorites_id))
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
        <>
        <div className="song-card" >
            {!togglePanel &&
            <div onClick={toggle}>
            <p>Track: {name}</p>
            {/* <ul>Artists:    
            {   artists.map((artist, index) =>{
                return <li key={index}>{artist}</li>
                })
            }
            </ul> */}
            <p>Duration: {mins}:{secs}</p>
            </div>
            }
            
            {!isSearching && <div>
            <button onClick={editing}>EDIT</button>
            <button onClick={handleDelete}>DELETE</button>
            </div>
            }
            

            {isSearching && <button onClick={handleAdd}>ADD</button>}
        </div>

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
            {togglePanel &&
                <div onClick={toggle}><FeaturedSong details={props.song}/></div>
            }
        </>
    )
}

export default SongCard;
