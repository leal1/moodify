import axios from 'util/axiosConfig';
import Cookies from 'js-cookie';
import { BASE_API_URL } from 'util/constants';


export const getSongsFromUser = () => {
        const id = Cookies.get('userId');
        return axios({ method: 'get', url:`${BASE_API_URL}/spotify/user/${id}/songs`});
}
export const addSongToUser = (song) => {
        const id = Cookies.get('userId');
        return axios.post(`${BASE_API_URL}/spotify/user/${id}/song`,song);
}
export const deleteSongFromUser = (songId) => {
        const id = Cookies.get('userId');
        return axios.delete(`${BASE_API_URL}/spotify/user/${id}/song/${songId}`);
}

export const addSpotifyUser = (spotifyUser) => {
        return axios.post(`${BASE_API_URL}/spotify/user`,spotifyUser);
}

export const getUserProfile = () => {
        const accessToken = Cookies.get('accessToken');
        console.log(accessToken);
        const headers = {
                'Authorization': `Bearer ${accessToken}`
        }
        // Have to call like this to pass
       return axios({ method: 'get', url: `${BASE_API_URL}/spotify/userProfile`, headers});
}
export const getUserPlaylists = () => {
        const accessToken = Cookies.get('accessToken');
       // console.log(accessToken);
        const headers = {
                'Authorization': `Bearer ${accessToken}`
        }
        // Have to call like this to pass
        return axios({ method: 'get', url: `${BASE_API_URL}/spotify/playlists`, headers});
}
export const addCurrentSongToPlaylist = (playlistID,URI) => {
        const accessToken = Cookies.get('accessToken');
         const headers = {
                 'Authorization': `Bearer ${accessToken}`
         }
     
         // Have to call like this to pass
         return axios.post(`${BASE_API_URL}/spotify/playlists/${playlistID}/song?uri=${URI}`,'',{headers});
}

export const startUserPlayback = (trackURI) => {
        const accessToken = Cookies.get('accessToken');
        const deviceID = Cookies.get('deviceID');
        console.log('deiceID' + deviceID);
        console.log(trackURI);
         const headers = {
                 'Authorization': `Bearer ${accessToken}`,
                 'Content-Type':'text/plain'    
         }
     
         // Have to call like this to pass
         return axios.put(`${BASE_API_URL}/spotify/player/start/${deviceID}`,trackURI,{headers});
      
}
export const resumeUserPlayback = () => {
        const accessToken = Cookies.get('accessToken');
        const deviceID = Cookies.get('deviceID');
        console.log('deiceID' + deviceID);
       // console.log(trackURI);
         const headers = {
                 'Authorization': `Bearer ${accessToken}`,
                 'Content-Type':'text/plain'    
         }
     
         // Have to call like this to pass
         return axios.put(`${BASE_API_URL}/spotify/player/resume/${deviceID}`,'',{headers});
      
}
export const pauseUserPlayback = () => {
        const accessToken = Cookies.get('accessToken');
        const deviceID = Cookies.get('deviceID');
        console.log('tring to pause song!');
         const headers = {
                 'Authorization': `Bearer ${accessToken}`
         }
     
         // Have to call like this to pass
         return axios.put(`${BASE_API_URL}/spotify/player/pause/${deviceID}`,'',{headers});
}

export const getUsersCurrentlyPlayingSong = () => {
        const accessToken = Cookies.get('accessToken');
         const headers = {
                 'Authorization': `Bearer ${accessToken}`
         }
     
         // Have to call like this to pass 
         return axios({ method: 'get', url: `${BASE_API_URL}/spotify/player/currently-playing`, headers});
}

export const getSongReccomendations = (mood, genres) => {
        const accessToken = Cookies.get('accessToken');
         const headers = {
                 'Authorization': `Bearer ${accessToken}`
         }
         const genresString = genres.join();
         // Have to call like this to pass 
         return axios({ method: 'get', url: `${BASE_API_URL}/spotify/recommendations?mood=${mood}&genres=${genresString}`, headers});
}

export const getSeveralTracks = (ids) => {
        const accessToken = Cookies.get('accessToken');
         const headers = {
                 'Authorization': `Bearer ${accessToken}`
         }
         // Have to call like this to pass 
         return axios({ method: 'get', url: `${BASE_API_URL}/spotify/tracks?ids=${ids}`, headers});
}
