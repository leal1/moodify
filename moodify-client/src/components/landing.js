import React, {useEffect, useCallback, useState} from 'react';
import WebcamModal from 'components/modal/webcam/webcamModal';
import GenreModal from 'components/modal/genre/genreModal';
import PlaylistModal from 'components/modal/playlist/playlistModal';
import SavedSongsModal from 'components/modal/saved_songs/savedSongsModal';
import Reccomendation from './reccomendation/reccomendation';
import queryString from 'query-string';
import * as auth from 'api/auth';
import Cookies from 'js-cookie';
import Player from 'components/player/player';
import Button from 'react-bootstrap/Button';
import PlayOrPause from 'components/playorpause/playorpause';
import * as spotify from 'api/spotify';


const LandingPage = ({location}) => {
    const [showWebcamModal, setShowWebcamModal] = React.useState(false);
    const [showGenreModal, setShowGenreModal] = React.useState(false);
    const [showPlaylistModal, setPlaylistModal] = React.useState(false);
    const [showSavedSongsModal, setSavedSongsModal] = React.useState(false);
    const [pauseSong, setPauseSong] = React.useState(false);
    const [showPlayorPause, setPlayorPause] = React.useState(false);
    const [songInfoData, setSongInfoData] = React.useState('');
    const [curSongData, setcurSongData] = React.useState('');
    const [recSongs, setRecSongs] = React.useState([]);
    const [savedSongs, setSavedSongs] = useState([]);


    useEffect(() => {
        // extract code from URL
        const {code} = queryString.parse(location.search);
        auth.getTokens(code);
    }, [location.search]);

    useEffect(() => {
        spotify.getUserProfile()
            .then(response => {
                Cookies.set('userId',response.data.id);
                console.log(Cookies.get('userId'));
                return spotify.addSpotifyUser(response.data);
            })
            .then(response => {
                console.log('new user added');
            })
    },[])

    const getSavedSongs = () => {
        spotify.getSongsFromUser()
            .then(response => {
                setSavedSongs(response.data);
                setSavedSongsModal(true);
            })
       
    }

    return(
        <div>
            <WebcamModal
                setRecommendedSongs={(songs) => {setRecSongs(songs)}}
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
                <Button variant="outline-primary" onClick={getSavedSongs}>
                    Saved Songs
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
            <SavedSongsModal
                showSavedSongsModal={showSavedSongsModal}
                hideSavedSongsModal={() => {setSavedSongsModal(false)}}
                savedSongs={savedSongs}
                getSavedSongs={getSavedSongs}
             />
            <Player/>
            
        </div>
    )
};
export default LandingPage;
