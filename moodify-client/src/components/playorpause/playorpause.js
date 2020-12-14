import React from 'react';
import * as spotify from 'api/spotify';
import './playorpause.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle} from '@fortawesome/free-solid-svg-icons';

const PlayOrPause = ({togglePause, pauseSong, curSongData, showPlayorPause}) => {

    const handlePause = () => {
        togglePause();
        spotify.pauseUserPlayback()
            .then(response => {
                console.log('Pausing Song!');
            })
    }
    const handlePlay = () => {
        togglePause();
        spotify.resumeUserPlayback()
        .then(response => {
            console.log('Playing Song!');
        })

    }
    const button = pauseSong ?  <FontAwesomeIcon className="hover" onClick={handlePause}icon={faPauseCircle} size="3x" color="blue" /> 
                             :  <FontAwesomeIcon className="hover" onClick={handlePlay} icon={faPlayCircle} size="3x" color="blue" />
    return(
        <div className="text-center mt-25">
            {showPlayorPause && button}
            <div className ="mt-25">
                <h3>{curSongData.name}</h3>
                <p>{ curSongData && curSongData.artists.map(artist => artist.name).join(', ')}</p>
            </div>
        </div>
    )
}
export default PlayOrPause;