import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axios";

const checkLoggedIn = async (setLoggedIn) => {
  const user = await AsyncStorage.getItem("user");
  axiosInstance
    .post("/api/auth/restricted", { user })
    .then((res) => {
      if (res.status === 200) {
        setLoggedIn(true);
      }
    })
    .catch((err) => {
      setLoggedIn(false);
    });
};

export default checkLoggedIn;
