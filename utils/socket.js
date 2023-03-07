import { io } from "socket.io-client";
import Constants from "expo-constants";

const socket =
  Constants.expoConfig.extra.ENVIRONMENT === "production"
    ? io("https://admin.allahsoft.dk")
    : // Alias for the ip of the host machine
      io("http://10.0.2.2:80");

socket.on("connect", () => {
  console.log("Connected to socket server");
});
socket.on("disconnect", () => {
  console.log("Disconnected");
});
socket.on("connect_error", (error) => {
  console.log("Connect Error.", error);
});
socket.on("connect_timeout", (timeout) => {
  console.log("Connect Timeout", timeout);
});
socket.on("error", (error) => {
  console.log("Error", error);
});
socket.on("reconnect", (attemptNumber) => {
  console.log("Reconnect", attemptNumber);
});
socket.on("reconnect_attempt", (attemptNumber) => {
  console.log("Reconnect Attempt", attemptNumber);
});
socket.on("reconnecting", (attemptNumber) => {
  console.log("Reconnecting", attemptNumber);
});
socket.on("reconnect_error", (error) => {
  console.log("Reconnect Error", error);
});
socket.on("reconnect_failed", () => {
  console.log("Reconnect Failed");
});

export default socket;
