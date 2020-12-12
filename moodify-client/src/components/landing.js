import React , {useEffect, useCallback, useState} from 'react';
import WebcamModal from './webcam/webcamModal';
import Reccomendation from './reccomendation/reccomendation';
import queryString from 'query-string';
import * as auth from '../api/auth';
import PlaylistModal from './playlist_modal/playlistModal';
import Player from './player/player';
import Button from 'react-bootstrap/Button';
import PlayOrPause from './playorpause/playorpause';
import * as spotify from '../api/spotify';

const LandingPage = ({location}) => {
    const [showWebcamModal, setShowWebcamModal] = React.useState(false);
    const [playlistModal, setPlaylistModal] = React.useState(false);
    const [pauseSong, setPauseSong] = React.useState(false);
    const [songData, setSongData] = React.useState('');
    const [recSongs, setRecSongs] = React.useState([]);
    //click on song, set to true to display button, generate new songs, set it back to false
    const [displayPlayorPause, setDisplayPlayOrPause] = React.useState(false);

    useEffect(() => {
        // extract code from URL
        const {code} = queryString.parse(location.search);
        auth.getTokens(code);
    }, [location.search]);

    const togglePause = () => {
        setPauseSong(!pauseSong);
    }

    const songClick = () => {
        setPauseSong(true);
    }

    const curSongData = (data) => {
        setSongData(data);
    }
    const setRecommendedSongs = (songs) => {
        setRecSongs(songs);
    } 

    return(
        <div>
            <WebcamModal
                setRecommendedSongs={setRecommendedSongs}
				show={showWebcamModal}
				onHide={() => setShowWebcamModal(false)}
			/>
            <h1 className="text-center">BEST SPOTIFY APP</h1>
			<p className="text-center">Take a picture of your face so we can analyze your mood and reccomend songs!</p>
            <div className="text-center">
                <Button variant="outline-primary" onClick={() => setShowWebcamModal(true)}>
                    Launch webcam
                </Button>
            </div>
			<Reccomendation recSongs={recSongs} curSongData={curSongData} songClick={songClick}/> 
            <PlayOrPause togglePause={togglePause} pauseSong={pauseSong} songData={songData}/>   
            <PlaylistModal songData={songData}/>
            <Player/>
        </div>
    )
};
export default LandingPage;
