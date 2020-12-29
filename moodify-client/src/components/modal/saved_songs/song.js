import React, { useEffect } from 'react';
import {Modal} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle, faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import * as spotify from 'api/spotify';
import './song.css';
const Song = (props) => {
    const [pauseSong, setPauseSong] = React.useState(false);
    useEffect(() => {
        setPauseSong(false);
        
    },[props.resetStatus])

    const handlePause = () => {
        setPauseSong(false);
        spotify.pauseUserPlayback();
    }
    const handlePlay = () => {
        props.resetPlayer();
        spotify.startUserPlayback(props.song.uri)
        .then(response => {
            setPauseSong(true);
            console.log('Playing Song!');
        })
    }
    const deleteSong = () => {
        spotify.deleteSongFromUser(props.song.id)
            .then(response => {
                spotify.pauseUserPlayback();
                console.log('deleting song from user');
                props.getSavedSongs();
           
            })
    }
    
    const button = pauseSong ?  <FontAwesomeIcon className="songButton hover" onClick={handlePause}icon={faPauseCircle} size="2x" color="blue" /> 
                             :  <FontAwesomeIcon className="songButton hover" onClick={handlePlay} icon={faPlayCircle} size="2x" color="blue" />
    return(
        <Modal.Body className ="song-flex-row"> 
            <div className="songImage"> {<img className="songModal-img" src={props.song.image}/>}</div>
            <div className="song-info">
                <div className="songName"> {props.song.name} </div>
                <div className="artists"> {props.song.artists} </div>
               
            </div>
            <div>
            {button}
            <FontAwesomeIcon className="hover" onClick={deleteSong} icon={faMinusCircle} size="2x" color="red" /> 
            </div>
          
        </Modal.Body>
    )
}
export default Song;
