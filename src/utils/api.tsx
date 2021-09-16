import { API_URL } from "./constants";
import axios from "axios";

const axiosAPI = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAPI.interceptors.request.use(config => {
  config.headers.Autorization = `Bearer ${localStorage.getItem('toket')}`;
  return config;
})

export default axiosAPI;
