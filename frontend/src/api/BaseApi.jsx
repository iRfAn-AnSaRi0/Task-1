import axios from "axios";

const api = axios.create({
  baseURL: "https://task-1-ngd8.onrender.com/api",
  withCredentials: true
});

export default api;
