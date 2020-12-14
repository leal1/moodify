import React, {useState,useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import * as spotify from 'api/spotify';
import Playlist from 'components/modal/playlist/playlist';
import PlaylistModalPagination from 'components/modal/playlist/playlistModalPagination';
import './playlistModal.css';


const PlaylistModal = (props) => {
    const [playlists,setPlaylists] = useState([]);
    const [playlistPage, setPlaylistPage] = useState([]);
    useEffect(() => {
        spotify.getUserPlaylists()
            .then(response => {
                const playlistItems = response.data.map(({id,name,images}) =>
                    ({id,name,images})
                );
            setPlaylists(playlistItems);
        })
    }, []);
 
    const displayPlaylistPage = (playlistPage) => {
        setPlaylistPage(playlistPage);
    } 

    const hideModal = () => {
        props.hidePlaylistModal();
        displayPlaylistPage([]);
    }
    return (
        <>
            <Modal centered  
                show={props.showPlaylistModal}
                onShow={()=>{setPlaylistPage(playlists.slice(0,3))}}
                onHide={hideModal}
                centered  
            >
                <Modal.Header closeButton>
                    <Modal.Title> 
                    Add Song to Playlist
                    </Modal.Title>
                </Modal.Header>
               
                <div className="playlist-flex">
                    {playlistPage.map(({id,name,images}) => <Playlist playlistID={id} key={id} name={name} images ={images} songInfoData={props.songInfoData}/>)}
                </div>
          
                <Modal.Footer>
                    <PlaylistModalPagination playlists={playlists} displayPlaylistPage={displayPlaylistPage}/>          
                </Modal.Footer>
          </Modal>
        </>
    );
};

export default PlaylistModal;