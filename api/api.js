import axios from "axios";

export const api = await axios.create({
  baseURL: "https://api.tronacademy.in/api/v1",
  withCredentials: true,
});

// baseURL: "https://api.tronacademy.in/api/v1",
// baseURL: "http://localhost:3000/api/v1",
