import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:5000/chat': '/chat',
  withCredentials: true,
});

export default axiosInstance;