import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import React from 'react';
import './genreModal.css';

// TODO: implement this stub
const GenreModal = (props) => {
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
					<Button variant="outline-primary"> Back </Button>
					<Button variant="outline-primary"> Done! </Button>
                </div>

            </Modal.Footer>
        </Modal>
  
    )
}

export default GenreModal;