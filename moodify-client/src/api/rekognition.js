import axios from 'util/axiosConfig';
import Cookies from 'js-cookie';
import { BASE_API_URL } from 'util/constants';

export const sendPhoto = (screenshot) => {
  const accessToken = Cookies.get('accessToken');

  const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
  }
  return axios.post(`${BASE_API_URL}/rekognition/photo`, screenshot, { headers });
}