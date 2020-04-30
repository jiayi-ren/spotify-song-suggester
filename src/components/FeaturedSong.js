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

    const mins = Math.floor((details.duration_ms/1000/60) << 0)
    const secs = ("0" + Math.floor((details.duration_ms/1000) % 60)).slice(-2)

    const styles = {
        width: '800px'
    }

    return (
        <div className="polar-chart" style={styles}>
            <div>
                <p>Track: {details.name}</p>
                <ul>Artists:    
                {   details.artists.map((artist, index) =>{
                    return <li key={index}>{artist}</li>
                    })
                }
                </ul>
                <p>Duration: {mins}:{secs}</p>
            </div>
            <Polar 
                data={spec}
                options={{
                    title:{
                    display:true,
                    text:'Audio Features',
                    fontSize:10
                    }
                }}
            />
        </div>
    )

}

export default FeaturedSong;