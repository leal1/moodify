import React , {useEffect, useCallback, useState} from 'react';
import WebcamModal from 'components/modal/webcam/webcamModal';
import GenreModal from 'components/modal/genre/genreModal';
import Reccomendation from './reccomendation/reccomendation';
import queryString from 'query-string';
import * as auth from 'api/auth';
import PlaylistModal from 'components/modal/playlist/playlistModal';
import Player from 'components/player/player';
import Button from 'react-bootstrap/Button';
import PlayOrPause from 'components/playorpause/playorpause';


const LandingPage = ({location}) => {
    const [showWebcamModal, setShowWebcamModal] = React.useState(false);
    const [showGenreModal, setShowGenreModal] = React.useState(false);
    const [showPlaylistModal, setPlaylistModal] = React.useState(false);
    const [pauseSong, setPauseSong] = React.useState(false);
    const [showPlayorPause, setPlayorPause] = React.useState(false);
    const [songInfoData, setSongInfoData] = React.useState('');
    const [curSongData, setcurSongData] = React.useState('');
    const [recSongs, setRecSongs] = React.useState([]);
    

    useEffect(() => {
        // extract code from URL
        const {code} = queryString.parse(location.search);
        auth.getTokens(code);
    }, [location.search]);

    return(
        <div>
            <WebcamModal
                setRecommendedSongs={(songs) => { setRecSongs(songs)}}
				show={showWebcamModal}
				onHide={() => setShowWebcamModal(false)}
			/>
            <GenreModal
				show={showGenreModal}
				onHide={() => setShowGenreModal(false)}
			/>
            <h1 className="text-center">BEST SPOTIFY APP</h1>
			<p className="text-center">Take a picture of your face so we can analyze your mood and reccomend songs!</p>
            <div className="text-center">
                <Button variant="outline-primary" onClick={() => setShowWebcamModal(true)}>
                    Launch webcam
                </Button>
            </div>
            <Reccomendation 
                displayPlayorPause={() => { setPlayorPause(true)}} 
                onShowPlaylistModal={() => {setPlaylistModal(true)}} 
                recSongs={recSongs} 
                songInformationData={(data) => {setSongInfoData(data)}} 
                setCurrentSongData={(data) => {setcurSongData(data)}} 
                songClick={()=>{setPauseSong(true)}}
            /> 
            <PlayOrPause 
                togglePause={() => {setPauseSong(!pauseSong)}} 
                showPlayorPause={showPlayorPause} 
                pauseSong={pauseSong} 
                curSongData={curSongData}
            />   
            <PlaylistModal
                showPlaylistModal={showPlaylistModal}
                hidePlaylistModal={() => {setPlaylistModal(false)}}
                songInfoData={songInfoData}
             />
            <Player/>
            
        </div>
    )
};
export default LandingPage;
