import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import * as spotify from '../../api/spotify';

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
    const button = pauseSong ?  <Button variant="outline-success" onClick={handlePause}> Pause </Button>
                             :  <Button variant="outline-success" onClick={handlePlay}> Play </Button>
    return(
        <div className="text-center">
        {button}
        <h3>{songData.name}</h3>
        </div>
            
    )
}
export default PlayOrPause;