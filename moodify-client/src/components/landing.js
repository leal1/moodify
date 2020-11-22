import React , {useEffect, useCallback, useState} from 'react';
import queryString from 'query-string';
import axios from 'axios';
import playlistModal from './playlistModal';
axios.defaults.baseURL = "http://localhost:8080";

const LandingPage = ({location}) => {
  const api = "/api/v1/auth";
  const playlistApi = "/api/v1/playlist";
  useEffect(() => {
    const {code} = queryString.parse(location.search); 
    axios.post(api +"/callback",code).then((data)=>{
      console.log(data);     
  }).catch((error)=> {
      console.log(error)
  })

  },[])
  const handleSubmitClick = (e) => {
    axios.get(api +"/redirect").then((data)=>{
        window.location.href = data.data;
    }).catch((error)=> {
        console.log(error)
    })
}
  return(
    <div className = "text-center">
      <h1>BEST SPOTIFY APP</h1>
      <button  type = "submit" onClick = {handleSubmitClick}> Save Song</button>

    </div>
  )
};
export default LandingPage;
