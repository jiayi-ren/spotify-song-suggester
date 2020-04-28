import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { useParams, useHistory } from "react-router-dom";

function Song(props) {
    const [song, setSong] = useState(null);
    const params = useParams();
    const { push } = useHistory();

    const fetchSong = (id) => {
        axiosWithAuth()
            .get("https://spotify-song-api.herokuapp.com/api/spotify/search")
    }
}