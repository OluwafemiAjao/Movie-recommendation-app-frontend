// services/authService.js
import backendApi from "./axiosConfig";

export const registerUser = async (name, email, password) => {
  const res = await backendApi.post("/auth/register", { name, email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await backendApi.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
