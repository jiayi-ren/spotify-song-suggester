// get ML data
import React from 'react';
import SearchList from './SearchList';
import SavedList from './SavedList';

const Card = props =>{

    const { title, artist, duration} = props.song

    return(
        <div className="song-card">
            <p>{title}</p>
            <p>{artist}</p>
            <p>{duration}</p>
        </div>
    )
}

export default Card