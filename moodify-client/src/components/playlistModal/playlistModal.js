import React, {useState,useCallback} from 'react';
import {Button, Modal} from 'react-bootstrap';
import * as spotify from '../../api/spotify';
import Playlist from '../playlist/playlist';
 import './playlistModal.css';


const PlaylistModal = ({songData}) => {
    const [playlistModal, setPlaylistModal] = React.useState(false);
    const [playlists,setPlaylists] = useState([]);

    const getUserPlaylists = () => {
        spotify.getUserPlaylists()
            .then((res) => {
                const playlistItems = res.data.map(({id,name,images}) =>
                    ({id,name,images})
                );
                console.log(playlistItems);
                setPlaylists(playlistItems);       
            })
    }
    const saveSongCLick = () => {
        setPlaylistModal(true);
        getUserPlaylists();
    }
   
    return (
        <>
            <div className = "text-center mt-25">
                <Button variant="outline-success" onClick={saveSongCLick}> Save Song </Button>
            </div>
            <Modal style={{top:"60%"}}show={playlistModal} onHide={() => setPlaylistModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Playlist</Modal.Title>
                </Modal.Header>
                <div className="playlist-flex">
                    {playlists.map(({id,name,images}) => <Playlist playlistID={id} key={id} name={name} images ={images} songData={songData}/>)}
                </div>
                <Modal.Footer>
                </Modal.Footer>
          </Modal>
        </>
    );
};

export default PlaylistModal;