import axios from "axios";
import Constants from "expo-constants";
const baseURL =
  Constants.expoConfig.extra.ENVIRONMENT === "production"
    ? "https://admin.allahsoft.dk"
    : // Alias for the ip of the host machine when using an emulator
    "http://10.142.112.125";
const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
