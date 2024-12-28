import axios from "axios";

// Replace this with your actual token retrieval logic
const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Your API's base URL
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
