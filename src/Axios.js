import axios from "axios";

const Axios = axios.create({
  baseURL: "https://asas-e-peedika-2023.onrender.com/api/v1",
  // baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
    authorization: localStorage.getItem("token"),
  },

  withCredentials: true,
});

export default Axios;
