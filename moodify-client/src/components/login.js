import React from 'react';
import axios from 'axios';
import "./login.css";

const Login = () => {
    const api = "/api/v1/auth";
    const handleSubmitClick = (e) => {
        axios.get(api + "/redirect").then(({data}) => {
            window.location.href = data;
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
            <div class="container">
                <div>
                    <h1>Moodify</h1>
                    <br /> <br /> <br />
                    <h2>This is the description for the app</h2>
                    <br /> <br /> <br /> <br /> <br /> <br />
                    <h6>login message</h6>
                    <button type="submit" onClick={handleSubmitClick}> Log In </button>
                </div>
            </div>
    )
}

export default Login;