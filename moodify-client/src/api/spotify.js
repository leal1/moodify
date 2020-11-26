import axios from '../util/axiosConfig';
import Cookies from 'js-cookie';
import { BASE_API_URL } from '../util/constants';

export const getUserProfile = () => {
        const accessToken = Cookies.get('accessToken');
        console.log(accessToken);
        const headers = {
                'Authorization': `Bearer ${accessToken}`
        }
        // Have to call like this to pass
       return axios({ method: 'get', url: `${BASE_API_URL}/test/userProfile`, headers});
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