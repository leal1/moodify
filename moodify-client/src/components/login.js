import React from 'react';
import axios from 'axios';
//axios.defaults.baseURL = "http://localhost:8080";
const Login = () => {
    const api = "/api/v1/users";

    const handleSubmitClick = (e) => {
        axios.get(api +"/redirect").then((data)=>{
            window.location.href = data.data;
        }).catch((error)=> {
            console.log(error)
        })
    }
    return(
        <button  type = "submit" onClick = {handleSubmitClick}> Log In</button>
    )
}

export default Login;