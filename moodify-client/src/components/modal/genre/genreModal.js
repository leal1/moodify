import Modal from 'react-bootstrap/Modal';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Container from 'react-bootstrap/Container';
import React, { useState } from 'react';
import './genreModal.css';

const GenreModal = (props) => {
    const genres = ["chill", "classical", "country", "edm", "hip-hop", "indie", "pop", "rock"];
    const [value, setValue] = React.useState([]);

    const handleChange = val => setValue(val);

    const onSubmit = () => {
        const selectedGenres = value.map(index => genres[index - 1]);
        props.setGenresFromSelection(selectedGenres);
        props.onHide();
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
                    Select some genres!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                        <ToggleButtonGroup type="checkbox" className="mb-2" value={value} onChange={handleChange} className="genre-group">
                                {genres.map((genre, idx) => (
                                    <ToggleButton key={idx} value={idx + 1} variant="outline-info" className="shadow-none mx-2 my-2 genre-button"> 
                                        {genre} 
                                    </ToggleButton>))}
                        </ToggleButtonGroup>
						
                </Container>
  
            </Modal.Body>
            <Modal.Footer>
                <div class="flex-container">
					<Button variant="outline-primary" onClick={() => props.onClickBack()}> Back </Button>
					<Button variant="outline-primary" onClick={onSubmit}> Done! </Button>
                </div>

            </Modal.Footer>
        </Modal>
  
    )
}

export default GenreModal;