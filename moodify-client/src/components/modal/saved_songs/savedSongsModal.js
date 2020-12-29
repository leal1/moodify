import React, {useState,useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import Song from 'components/modal/saved_songs/song';
import SavedSongsModalPagination from 'components/modal/saved_songs/savedSongsModalPagination';

const SavedSongsModal = (props) => { 
    const [songPage, setSongPage] = useState([]);
    const [reset, setReset] = useState(false);
   
    useEffect(() => {
        setSongPage(props.savedSongs.slice(0,5))
    },[props.savedSongs])

    const hideModal = () => {
        props.hideSavedSongsModal();
        setSongPage([]);
    }
    const displaySongPage = (songs) => {
        setSongPage(songs);

    } 

    return (
        <>
            <Modal 
                show={props.showSavedSongsModal}
                onHide={hideModal}
                centered  
            >
                <Modal.Header closeButton>
                    <Modal.Title> 
                    Saved Songs
                    </Modal.Title>
                </Modal.Header>
               
                <div className="song-flex">
                    {songPage.map((song,index) => <Song getSavedSongs={props.getSavedSongs} resetPlayer={() => setReset(!reset)} resetStatus={reset} key={index} song={song}/>)}
                </div>
          
                <Modal.Footer>
                    <SavedSongsModalPagination 
                        resetPlayer={() => setReset(!reset)} 
                        savedSongs={props.savedSongs} 
                        displaySongPage={displaySongPage}
                    />          
                </Modal.Footer>
          </Modal>
        </>
    );
}
export default SavedSongsModal;