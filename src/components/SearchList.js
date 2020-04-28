import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SongCard from './SongCard.js'

const getURL = ''

const sample = [
    {id: 0, title: 'title 1', artist: 'artist 1', duration: 'duration 1'},
    {id: 1, title: 'title 2', artist: 'artist 1', duration: 'duration 1'},
    {id: 2, title: 'title 3', artist: 'artist 1', duration: 'duration 1'},
    {id: 3, title: 'title 4', artist: 'artist 1', duration: 'duration 1'}
]

const init = []
let start = 0

const SearchList = props =>{

    const {searchedSong, addToSavedList} = props

    // const [search, setSearch] = useState('')
    const [songList, setSongList] = useState(init)

    ///////////TO DO: Get song list from Database Server based on Search/////
    // const getSearch = song =>{
    //     axios.get(getURL)
    //         .then(res =>{
    //             setSongList(res.data)
    //         })
    //         .catch(err =>{
    //             console.log(err)
    //         })
    // }

    useEffect(()=>{
        console.log("outsie"+start)
        if(start === 1){
            console.log("start is "+start)
            console.log("SearchList submit")
            setSongList(sample)
        }
    },[searchedSong])

    useEffect(()=>{
        start = 1
    },[])


    /////////////////////////////////////////////////
    /// songlist sample
    // songlist:[
    //     {id: , title, artist, duration},
    //     {id: , title, artist, duration},
    //     {id: , title, artist, duration},...
    // ]

    const saveSong = event =>{
        const addToSavedList = props.addToSavedList;
        addToSavedList(event.target.value)
        console.log("save handler"+event.target.value)
        console.log("saved")
    }

    return(
        <div>
            {
                songList.map((song, index)=>{
                    return(
                        <div key={index}>
                            <SongCard song={song}/>
                            <button name='save' value={song.id} onClick={saveSong}>Add to Favorites</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SearchList;