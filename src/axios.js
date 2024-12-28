import axios from "axios";

// Replace this with your actual token retrieval logic
const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "https://proctorpro-backend.onrender.com/api/v1", // Your API's base URL
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
