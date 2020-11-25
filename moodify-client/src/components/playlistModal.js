import React, {useState,useCallback} from 'react';
import {Button, Modal} from 'react-bootstrap';
import * as spotify from '../api/spotify';
// import './playlistModal.css';
const ModalBody = ({playlist}) => {
    return(
    <Modal.Body>{playlist}</Modal.Body>
    )              
}

const PlaylistModal = () => {
    const [show, setShow] = useState(false);
    const [playlists,setPlaylists] = useState([]);
    const getUserPlaylists = useCallback(() => {
    
        spotify.getUserPlaylists()
            .then((res) => {
                 const items = res.data.map(({name}) =>
                    name
                    
                );
                setPlaylists(items);
                console.log(playlists);
                
            })
    }, [])
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        getUserPlaylists();
        

    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>
    
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Playlist</Modal.Title>
                </Modal.Header>
                {playlists.map((playlist) =>  <div ><Modal.Body className ="music">{playlist}</Modal.Body></div>)}
           
                
            
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
          </Modal>
        </>
    );
};

export default PlaylistModal;