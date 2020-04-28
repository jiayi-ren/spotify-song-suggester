import React, { useState, useEffect } from "react";

import { axiosWithAuth } from "../../utils/axiosWithAuth";

const SongsPage = () => {
    const [songsList, setSongsList] = useState([]);

    const getSongs = () => {
        axiosWithAuth()
        .get("https://spotify-song-api.herokuapp.com/api/auth/spotify")
        .then(response => {
            console.log({response})
            setSongsList(response.data)
        })
        .catch(err => {
            console.log({err}, "There was an error")
        })
    }

    useEffect(() => {
        getSongs()
    }, [])

    return (
        <div>
            <hi>Songs</hi>
            <form>
                <input 
                    type="text"
                    placeholder="Search..."
                />
            </form>
        </div>
    )
}

export default SongsPage;