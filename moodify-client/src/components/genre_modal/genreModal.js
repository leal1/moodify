import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Webcam from 'react-webcam';
import * as spotify from '../../api/spotify';
import axios from '../../util/axiosConfig';
import { BASE_API_URL } from '../../util/constants';
import './webcamModal.css';

const GenreModal = (props) => {
    const webcamRef = React.useRef(null);
    const [screenshot, setScreenshot] = useState("");

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
        setScreenshot(imageSrc);

    },[webcamRef])

    const sendPhoto = () => {
        props.onHide();
        const accessToken = Cookies.get('accessToken');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
        axios.post(`${BASE_API_URL}/rekognition/photo`, screenshot, {
            headers
        })
        .then((response) => {
            return spotify.getSongReccomendations(response.data)
        })
        .then(response => {
            const spotifyIDS = response.data.map(song => song.id);
            return spotify.getSeveralTracks(spotifyIDS);
        })
        .then(response => {
            console.log(response.data);
            props.setRecommendedSongs(response.data);
        })
    }

    const clearScreenshot = () => {
        setScreenshot("");
    }

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Select some genres!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    <div class="flex-container">
						genres will go here.
                    </div>
                </Container>
  
            </Modal.Body>
            <Modal.Footer>
                <div class="flex-container">
					<Button variant="outline-primary" onClick={capture}> Back </Button>
					<Button variant="outline-primary" onClick={capture}> Done! </Button>
                </div>

            </Modal.Footer>
        </Modal>
  
    )
}

export default GenreModal;