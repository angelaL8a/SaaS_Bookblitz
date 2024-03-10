import axios from "axios";

// Axios client with custom base url
export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});
