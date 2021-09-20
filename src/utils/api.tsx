import { API_URL } from "./constants";
import axios from "axios";

const axiosAPI = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAPI.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return config;
})

axiosAPI.interceptors.response.use(config => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if((error.response.status === 401 || error.response.status === 403) && !error.config._isRetry && originalRequest){
    originalRequest._isRetry = true;
    try {
      const response = await axios.post(API_URL+'/auth/token', {token: localStorage.getItem('refreshToken')});
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('accessToken', response.data.accessToken.split(' ')[1]);
      return axiosAPI.request(originalRequest);
    }catch (error) {
      console.log('Авторизуйтесь');
    }
    throw error;
  }
})

export default axiosAPI;
