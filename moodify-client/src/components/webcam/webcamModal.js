import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import React, { useState } from 'react';
import Cookies from 'js-cookie';

import Webcam from 'react-webcam';

import axios from '../../util/axiosConfig';
import { BASE_API_URL } from '../../util/constants';
import './webcamModal.css';

const WebcamModal = (props) => {
    const webcamRef = React.useRef(null);
    const [screenshot, setScreenshot] = useState("");

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
        setScreenshot(imageSrc);
        const accessToken = Cookies.get('accessToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
        axios.post(`${BASE_API_URL}/rekognition/photo`, imageSrc, {
            headers
        })
        .then((response) => {
            console.log(response);
        })
    },[webcamRef])

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
                    Take a picture!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    <div class="flex-container">
                    {screenshot===''
                        ? <Webcam className="min-width" audio={false} ref={webcamRef} screenshotFormat="image/png"/>
                        : <img className="min-width" src={`${screenshot}`}/>
                        
                    }
                    </div>
                </Container>
  
            </Modal.Body>
            <Modal.Footer>
                <div class="flex-container">
                    {screenshot ==='' && <Button variant="outline-primary" onClick={capture}>Capture photo</Button>}
                    {screenshot !=='' && <Button variant="outline-primary" onClick={capture}>Use this photo?</Button>}
                    {screenshot !=='' && <Button variant="outline-danger" onClick={clearScreenshot}>Take another </Button>}
                </div>

            </Modal.Footer>
        </Modal>
  
    )
}

export default WebcamModal;