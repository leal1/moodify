import React,{useState} from 'react';
import {Modal,Button,Popover,OverlayTrigger} from 'react-bootstrap';
import * as spotify from 'api/spotify';


const Playlist = ({playlistID,name,images,songInfoData}) => {
    const [showPlaylistPopup,setPlaylistPopup] = React.useState(false);
    const popover = (
        <Popover id="popover-basic">
          <Popover.Content>
            {songInfoData.name} has been added to {name}!
          </Popover.Content>
        </Popover>
      );
    const hasImage = images.length > 0;
    const AddSongToPlaylist = () => {
        spotify.addCurrentSongToPlaylist(playlistID,[songInfoData.uri])
            .then(response => {
                setPlaylistPopup(true);
                setTimeout(() => {
                    setPlaylistPopup(false);
                  }, 1000); 
            })
    }
    return(
        <Modal.Body className ="playlist-flex-row"> 
            <div className="playlistImage"> {hasImage && <img className="playlist-img" src={images[0].url}/>}</div>
            <div className="playlistName"> {name} </div>
            <div>
                <OverlayTrigger show={showPlaylistPopup} placement="right" overlay={popover}>
                    <Button variant="outline-primary" onClick={AddSongToPlaylist}> Add </Button>
                </OverlayTrigger>
            </div>
               
               

        </Modal.Body>
        
    );
};
export default Playlist;