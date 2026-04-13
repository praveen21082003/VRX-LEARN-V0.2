import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true"
  },
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API ERROR:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
