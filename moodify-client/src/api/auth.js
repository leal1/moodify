import axios from 'util/axiosConfig';
import Cookies from 'js-cookie';
import { BASE_API_URL } from 'util/constants';

export const getTokens = (code) => {
        const headers = {
                'Content-Type': 'application/json',
        }
        return axios.post(`${BASE_API_URL}/auth/callback`, code, {
                headers
        })
        .then(({data}) => {
                Cookies.set('accessToken', data.accessToken);
                Cookies.set('refreshToken', data.accessToken);
                console.log(Cookies.get());

                // setAccessToken(data.accessToken);
                // setRefreshToken(data.refreshToken);
            })
}

export const sendToken = () => {
        const accessToken = Cookies.get('accessToken');
        const headers = {
                'Authorization': `Bearer ${accessToken}`
            }

        axios.post(`${BASE_API_URL}/test/sendToken`, {}, {
                headers
        });
}
