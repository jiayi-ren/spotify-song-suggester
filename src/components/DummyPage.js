import React, { useEffect, useState } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

function DummyPage(props) {
    const [music, setMusic] = useState(null);

    const deleteCard = e => {
        e.preventDefault()
        axiosWithAuth()
            .get('https://spotify-song-api.herokuapp.com/api/spotify/search')
            .then(response => {
                console.log({response})
            })
            .catch(err => {
                console.log({err})
            })
    }

    return (
        <div>
            <button onClick={deleteCard}>Button</button>
        </div>
    )
}

export default DummyPage;