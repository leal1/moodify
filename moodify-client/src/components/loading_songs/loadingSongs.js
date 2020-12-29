import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './loadingSongs.css';

const loadingSongs = () => {
  return (
    <div className="loading-container text-center mt-5">
      <div className="mr-2">
        Loading reccomended songs...
      </div>
      <Spinner className="ml-2" animation="border" role="status" variant="success">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>

  );
};

export default loadingSongs;