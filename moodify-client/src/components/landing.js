import React , {useEffect} from 'react';
import queryString from 'query-string';
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8080";

const LandingPage = ({location}) => {
  const api = "/api/v1/auth";
  useEffect(() => {
    const {code} = queryString.parse(location.search); 
    axios.post(api +"/callback",code).then((data)=>{
      console.log(data);     
  }).catch((error)=> {
      console.log(error)
  })

  },[])
  return(
    <div className = "text-center">
      <h1>BEST SPOTIFY APP</h1>
    </div>
  )
};
export default LandingPage;
