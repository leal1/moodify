import React,{useState} from 'react';
import * as spotify from 'api/spotify';
import {Dropdown, DropdownButton, Popover, OverlayTrigger} from 'react-bootstrap';
import './songInformation.css';
const SongInformationDropdown = (props) => {
    const [show,setShow] = React.useState(false);
    const popover = (
        <Popover id="popover-basic">
          <Popover.Content>
            {props.song.name} has been saved!
          </Popover.Content>
        </Popover>
      );

    const handleAddToPlaylist = (e) => {
        e.preventDefault();
        props.songInformationData(props.song);
        props.onShowPlaylistModal();
        
    }
    const handleSaveSongClick = (e) => {
        e.preventDefault();
        console.log(props.song);
        let {id,
            name,
            uri,
            artists,
            album:{
                images:[{
                    url:image
                }]
            }
         } = props.song; 
        
 
      artists = artists.map(artist => artist.name).join(", ");
      const songPayload = {id,name,uri,artists,image};
      spotify.addSongToUser(songPayload)
         .then(response => {
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 1000); 
         }) 
    }
    
    return(
        <OverlayTrigger show={show} placement="bottom" overlay={popover}>
            <DropdownButton size="sm" className="dropdownStyle">
                <Dropdown.Item as="button" onClick={handleAddToPlaylist} >Add to playlist</Dropdown.Item>
                <Dropdown.Item as="button">Add to queue</Dropdown.Item>
                <Dropdown.Item as="button" onClick={handleSaveSongClick}>Save Song</Dropdown.Item> 
            </DropdownButton>
        </OverlayTrigger>
     
    )
}
export default SongInformationDropdown;