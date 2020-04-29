import React from 'react';
import {Polar} from 'react-chartjs-2';

const FeaturedSong = props =>{

    const {details} = props

    const acoustic = Math.floor(details.acousticness*100)
    const danceable = Math.floor(details.danceability*100)
    const energetic = Math.floor(details.energy*100)
    const live = Math.floor(details.liveness*100)
    const speech = Math.floor(details.speechiness*100)

    const spec = {
        labels: ['Acousticness', 'Danceability','Energy', 'Liveness', 'Speechiness'],
        datasets: [
            { data: [acoustic, danceable, energetic, live, speech]}
        ]
    }

    return (
        <div>
            <Polar 
                data={spec}
                options={{
                    title:{
                    display:true,
                    text:'Audio Features',
                    fontSize:15
                    }
                }}
            />
        </div>
    )

}

export default FeaturedSong;