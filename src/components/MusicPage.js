import React, { useState } from 'react';
import SearchList from './SearchList';

const MusicPage = props =>{

    const {addToSavedList} = props

    const [searchValue, setSearchValue] = useState('')
    const [searchedSong, setSearchedSong] = useState('')

    const onInputChange = event =>{
        setSearchValue(event.target.value)
    }

    const onSubmit = event =>{
        event.preventDefault()
        console.log("MusicPage Submit")
        setSearchedSong(searchValue)
    }

    return (
        <div>
            <form>
                <input name='song' value={searchValue} type='text' placeholder='Enter a song' onChange={onInputChange}></input>
                <button name='search' onClick={onSubmit}>Search</button>
            </form>
            <SearchList searchedSong={searchedSong} addToSavedList={addToSavedList}/>
        </div>
    )
}

export default MusicPage;