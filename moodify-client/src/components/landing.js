import React , {useEffect, useRef, useState} from 'react';
import WebcamModal from 'components/modal/webcam/webcamModal';
import GenreModal from 'components/modal/genre/genreModal';
import PlaylistModal from 'components/modal/playlist/playlistModal';
import SavedSongsModal from 'components/modal/saved_songs/savedSongsModal';
import Reccomendation from './reccomendation/reccomendation';
import queryString from 'query-string';
import * as auth from 'api/auth';
import * as spotify from 'api/spotify';
import PlaylistModal from 'components/modal/playlist/playlistModal';
import LoadingSongs from 'components/loading_songs/loadingSongs';
import Player from 'components/player/player';
import Button from 'react-bootstrap/Button';
import PlayOrPause from 'components/playorpause/playorpause';

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
    //click on song, set to true to display button, generate new songs, set it back to false
    const [displayPlayorPause, setDisplayPlayOrPause] = React.useState(false);
    const [mood, setMood] = React.useState("");
    const [genres, setGenres] = React.useState([]);
    const [loading, setLoading] = useState(false);

    const firstUpdate = useRef(true);
    const [savedSongs, setSavedSongs] = useState([]);


    useEffect(() => {
        // extract code from URL
        const {code} = queryString.parse(location.search);
        auth.getTokens(code);
    }, [location.search]);

    const switchToGenreModal = () => {
        setShowWebcamModal(false);
        setShowGenreModal(true);
    }

    const switchToWebcamModal = () => {
        setShowGenreModal(false);
        setShowWebcamModal(true);
    }

    const setMoodFromPhoto = (generatedMood) => {
        setMood(generatedMood);
        console.log("Just set mood: " + generatedMood);
    }

    const setGenresFromSelection = (selectedGenres) => {
        setGenres(selectedGenres);
        console.log("Just set genres: " + selectedGenres);
    }

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
          }
        setRecSongs([]);
        if(mood === "" || genres.length === 0) {
            setLoading(true);

            console.log("Mood: " + mood);
            console.log("Genres: " + genres);
            console.log("not yet...");
            return;
        }
        console.log("Mood: " + mood);
        console.log("Genres: " + genres);
        displayReccomendedSongsByMood(mood, genres);

    }, [mood, genres])

    const displayReccomendedSongsByMood = async (mood, genres) => {
        try {
            const reccomendationResponse = await spotify.getSongReccomendations(mood, genres);
            const spotifyIDS = reccomendationResponse.data.map(song => song.id);
            const trackResponse = await spotify.getSeveralTracks(spotifyIDS);
            setRecSongs(trackResponse.data);
            setLoading(false);
        } catch(err) {
            console.error(err);
        }
    }

    const togglePause = () => {
        setPauseSong(!pauseSong);
    }
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


    const handleClose = () => {
        setLoading(false);
        setShowWebcamModal(false);
        setShowGenreModal(false);
    }

    return(
        <div>
            <WebcamModal
                setRecommendedSongs={(songs) => {setRecSongs(songs)}}
				show={showWebcamModal}
				onHide={() => setShowWebcamModal(false)}
                onUsePhoto={switchToGenreModal}
                setMoodFromPhoto={setMoodFromPhoto}
                clearMood={() => setMood("")}
                handleClose={handleClose}
			/>
            <GenreModal
				show={showGenreModal}
				onHide={() => setShowGenreModal(false)}
                onClickBack={switchToWebcamModal}
                setGenresFromSelection={setGenresFromSelection}
                handleClose={handleClose}
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
            {
                (loading === true && recSongs.length === 0) && <LoadingSongs></LoadingSongs>
            }

			{ recSongs.length !== 0 && <Reccomendation recSongs={recSongs} curSongData={curSongData} songClick={songClick}/>}
            <PlayOrPause togglePause={togglePause} pauseSong={pauseSong} songData={songData}/>   
            <PlaylistModal songData={songData}/>
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
