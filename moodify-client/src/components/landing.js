import React , {useEffect, useCallback, useState} from 'react';
import WebcamModal from './webcam/webcamModal';
import Reccomendation from './reccomendation/reccomendation';
import queryString from 'query-string';
import * as auth from '../api/auth';
import * as spotify from '../api/spotify';
import PlaylistModal from './playlistModal';

import Button from 'react-bootstrap/Button';

const LandingPage = ({location}) => {
	const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        // extract code from URL
        const {code} = queryString.parse(location.search);
        auth.getTokens(code)
    }, [location.search]);

    return(
        <div>
            <WebcamModal
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
            <h1 className="text-center">BEST SPOTIFY APP</h1>
			<p className="text-center">Take a picture of your face so we can analyze your mood and reccomend songs!</p>
            <div className="text-center">
                <Button variant="outline-primary" onClick={() => setModalShow(true)}>
                    Launch webcam
                </Button>
            </div>
			<Reccomendation/>
        </div>
    )
};
export default LandingPage;
