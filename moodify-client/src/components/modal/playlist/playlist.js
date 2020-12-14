import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import * as spotify from 'api/spotify';

const Playlist = ({playlistID,name,images,songInfoData}) => {
    const hasImage = images.length > 0;
    const handleAddSong = () => {
        spotify.addCurrentSongToPlaylist(playlistID,[songInfoData.uri])
            .then(res => {
                alert(`Added song ${songInfoData.name} to ${name}`);
            })
    }
    return(
        <Modal.Body className ="playlist-flex-row"> 
            <div className="playlistImage"> {hasImage && <img className="playlist-img" src={images[0].url}/>}</div>
            <div className="playlistName"> {name} </div>
            <div><Button variant="outline-primary" onClick={handleAddSong}> Add </Button></div>
        </Modal.Body>
    );
};
export default Playlist;