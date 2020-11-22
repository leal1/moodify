import React , {useEffect, useCallback, useState} from 'react';
import queryString from 'query-string';
import * as auth from '../api/auth';
import * as spotify from '../api/spotify';

import Webcam from 'react-webcam';

const LandingPage = ({location}) => {

    // TODO: extract webcam
    const webcamRef = React.useRef(null);
    const [screenshot, setScreenshot] = useState("");

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
        setScreenshot(imageSrc);
    },[webcamRef])


    useEffect(() => {
        // extract code from URL
        const {code} = queryString.parse(location.search);
        auth.getTokens(code)
    }, [location.search]);

    const testToken = useCallback(() => {
        auth.sendToken();
    }, []);

    const getUserProfile = useCallback(() => {
        spotify.getUserProfile()
            .then((res) => {
                console.log(res);
            })
    }, [])

    return(
        <div className = "text-center">
            <h1>BEST SPOTIFY APP</h1>
            <button onClick={testToken}> test token </button>
            <button onClick={getUserProfile}> Get User profile </button>
            {/* TODO extract webcam to component. */}
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/png"/>
            <button onClick={capture}>Capture photo</button>
            {screenshot ?    <img src={`${screenshot}`}/> : ''}
        </div>
    )
};
export default LandingPage;
