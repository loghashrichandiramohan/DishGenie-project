import axios from "axios";

const API = axios.create({
  baseURL: "https://dishgenie-project.onrender.com" , // Your backend URL
});

// Attach token to requests (for authenticated routes)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
