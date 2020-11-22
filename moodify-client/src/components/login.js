import React from 'react';
import axios from 'axios';

const Login = () => {
        const api = "/api/v1/auth";
        const handleSubmitClick = (e) => {
                axios.get(api + "/redirect").then(({data}) => {
                        window.location.href = data;
                }).catch((error)=> {
                        console.log(error)
                })
        }
        return(
                <button type="submit" onClick={handleSubmitClick}> Log In </button>
        )
}

export default Login;