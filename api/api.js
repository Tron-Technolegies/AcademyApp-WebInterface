import axios from "axios";

export const api = await axios.create({
  baseURL: "https://api.tronacademy.in/api/v1",
  withCredentials: true,
});
