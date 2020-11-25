import axios from '../util/axiosConfig';
import Cookies from 'js-cookie';
import {API_BASE_URL} from '../util/constants';

export const getUserProfile = () => {
        const accessToken = Cookies.get('accessToken');
        console.log(accessToken);
        const headers = {
                'Authorization': `Bearer ${accessToken}`
        }
        // Have to call like this to pass
        return axios({ method: 'get', url: '/api/v1/test/userProfile', headers});
}
export const getUserPlaylists = () => {
        const accessToken = Cookies.get('accessToken');
       // console.log(accessToken);
        const headers = {
                'Authorization': `Bearer ${accessToken}`
        }
        // Have to call like this to pass
        return axios({ method: 'get', url: '/api/v1/playlists', headers});
}