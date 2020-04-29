import React, { useState, useEffect } from "react";

import SongCard from "./SongCard.js";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const SearchList = props => {
    const initialValue = ""

    const sample = [
        {
            id: "5UEvfBx5yQ14HALjI8jk3t",
            name: "When I Was Young",
            artists: [
                "MØ"
            ],
            album_name: "When I Was Young - EP",
            danceability: 0.677,
            energy: 0.689,
            key: 3,
            loudness: -5.126,
            mode: 0,
            speechiness: 0.119,
            acousticness: 0.151,
            instrumentalness: 0.000207,
            liveness: 0.121,
            valence: 0.572,
            tempo: 147.864,
            type: "audio_features",
            uri: "spotify:track:5UEvfBx5yQ14HALjI8jk3t",
            track_href: "https://api.spotify.com/v1/tracks/5UEvfBx5yQ14HALjI8jk3t",
            analysis_url: "https://api.spotify.com/v1/audio-analysis/5UEvfBx5yQ14HALjI8jk3t",
            duration_ms: 219720,
            time_signature: 4
        }
    ]

    const [search, setSearch] = useState(initialValue);
    const [searchedSongs, setSearchedSongs] = useState([]);

    const handleChange = e => {
        e.preventDefault();
        setSearch(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(search.input)
        // setSearchedSongs(sample)
        axiosWithAuth().get(`/api/spotify/search?q=${search}`)
            .then(response => {
                console.log({ response }, "this is handleSubmit response")
            })
            .catch(err => {
                console.log({ err }, "there was an error with handleSubmit")
            })
    }

    return (
        <>
        <h2>Search Songs</h2>
        <form onSubmit={handleSubmit} >
            <input 
                name="search"
                type="text"
                value={search.input}
                onChange={handleChange}
                placeholder="search..."
            />
            <button>Search</button>
        </form>

        {searchedSongs && searchedSongs.map(song => {
            return (
                <div>
                <SongCard key={song.id} song={song} /> 
                </div>
                )

        })}
        </>
    )
}

export default SearchList;