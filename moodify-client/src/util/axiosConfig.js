import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8080";


axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
	    originalRequest._retry = true;
	    // TODO: setup refresh
            const access_token = "test";
            console.log(access_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
            return axios(originalRequest);
        }
        return Promise.reject(error);
    }
)
axios.defaults.headers.common = {
	'Content-Type': 'application/json'
}

export default axios;