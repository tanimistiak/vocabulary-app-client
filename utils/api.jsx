import axios from "axios";

const api = axios.create({
  baseURL: "https://vocabulary-app-server.onrender.com/api", // Replace with your backend URL
  withCredentials: true, // Include cookies
});

export default api;
