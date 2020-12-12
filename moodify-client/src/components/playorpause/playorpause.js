import React from 'react';
import {Button} from 'react-bootstrap';
import * as spotify from 'api/spotify';
import './playorpause.css';

const PlayOrPause = ({togglePause, pauseSong, songData}) => {

    const toggle = pauseSong ? 'Pause' : 'Play';
    const handlePause = () => {
        togglePause();
        spotify.pauseUserPlayback()
            .then(res => {
                console.log('Pausing Song!');
            })
    }
    const handlePlay = () => {
        togglePause();
        spotify.resumeUserPlayback()
        .then(res => {
            console.log('Playing Song!');
        })

    }
    const button = pauseSong ?  <Button className="mt-25" variant="outline-success" onClick={handlePause}> Pause </Button>
                             :  <Button className="mt-25" variant="outline-success" onClick={handlePlay}> Play </Button>
    return(
        <div className="text-center">
        {songData && button}
        <div className ="mt-25">
            <h3>{songData.name}</h3>
            <p>{ songData && songData.artists.map(artist => artist.name).join(', ')}</p>
        </div>
        
        </div>
            
    )
}
export default PlayOrPause;