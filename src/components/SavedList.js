import React from 'react'
import SongCard from './SongCard.js';

const SavedList = props =>{

    const {savedList} = props

    return(
        <div>
            <h3>My favorites</h3>
            {
                savedList.map( (favoriteSong, index) =>{
                    return(
                        <SongCard key={index} song={favoriteSong}/>
                    )
                })
            }
        </div>
    )
}

export default SavedList;