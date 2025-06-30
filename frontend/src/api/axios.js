import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5500/api", // your backend base url
});

// Attach token to each request if exists
instance.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
