import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import React, { useState } from 'react';
import Webcam from 'react-webcam';
import * as rekognition from 'api/rekognition';
import './webcamModal.css';

const WebcamModal = (props) => {
    const webcamRef = React.useRef(null);
    const [screenshot, setScreenshot] = useState("");

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setScreenshot(imageSrc);
    },[webcamRef])

    const sendPhoto = async () => {
        props.onUsePhoto();
        try {
            const response = await rekognition.sendPhoto(screenshot);
            props.setMoodFromPhoto(response.data);
        } catch(err) {
            console.error(err);
        }
    }

    const clearScreenshot = () => {
        props.clearMood();
        setScreenshot("");
    }

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => props.handleClose()}
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
                        : <img className="min-width" src={`${screenshot}`} alt="screenshot"/>
                        
                    }
                    </div>
                </Container>
  
            </Modal.Body>
            <Modal.Footer>
                <div class="flex-container">
                    {screenshot === '' && <Button variant="outline-primary" onClick={capture}>Capture photo</Button>}
                    {screenshot !== '' && <Button variant="outline-primary" onClick={sendPhoto}>Use this photo?</Button>}
                    {screenshot !== '' && <Button variant="outline-danger" onClick={clearScreenshot}>Take another </Button>}
                </div>

            </Modal.Footer>
        </Modal>
  
    )
}

export default WebcamModal;