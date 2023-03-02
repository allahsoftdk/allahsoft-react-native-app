import axios from "axios";
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://admin.allahsoft.dk"
    : // Alias for the ip of the host machine
      "http://10.0.2.2";
const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
