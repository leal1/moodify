import React, {useState,useCallback} from 'react';
import {Modal} from 'react-bootstrap';
const Playlist = ({id,name,images}) => {

    const hasImage =  {images}.images.length > 0;
    console.log(hasImage);
    return(
        <Modal.Body className ="playlist-flex-row"> 
            {hasImage && <img className ="img" src ={{images}.images[0].url}/>} {name} 
        </Modal.Body>
    );
};
export default Playlist;