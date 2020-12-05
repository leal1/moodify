import React, {useEffect,useState} from 'react';
import Cookies from 'js-cookie';
import Script from 'react-load-script';

const Player = () => {
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [scriptError, setScriptError] = useState(false);
    useEffect(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            handleLoadSuccess();
        };

    },[])
    const handleLoadSuccess = () => {
        setScriptLoaded(true);
        console.log('script loaded');
        const accessToken = Cookies.get('accessToken');
        const SDKplayer = new window.Spotify.Player({
            name: 'Web Playback SDK Quick Start Player',
            getOAuthToken: cb => { cb(accessToken); }
        });
        console.log(SDKplayer);
            // Error handling
        SDKplayer.addListener('initialization_error', ({ message }) => { console.error(message); });
        SDKplayer.addListener('authentication_error', ({ message }) => { console.error(message); });
        SDKplayer.addListener('account_error', ({ message }) => { console.error(message); });
        SDKplayer.addListener('playback_error', ({ message }) => { console.error(message); });

        // Playback status updates
        SDKplayer.addListener('player_state_changed', state => { console.log(state); });
  
        // Ready
        SDKplayer.addListener('ready', ({ device_id }) => {
            Cookies.set('deviceID',device_id);
            console.log('Ready with Device ID', device_id);
        });
      
        // Not Ready
        SDKplayer.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        SDKplayer.connect();

    }
    return (
        <Script
            url="https://sdk.scdn.co/spotify-player.js"
            onCreate={() => setScriptLoaded(false)}
            onError={() => setScriptError(true)}
            onLoad={() => setScriptLoaded(false)}
        />

    );
};
export default Player;
