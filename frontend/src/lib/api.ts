import axios, { AxiosRequestConfig } from "axios";

const axiosclient = axios.create({
  baseURL: process.env.REACT_APP_NODE_API_URL,
});


axiosclient.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = localStorage.getItem("token");
  config.headers!.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export { axiosclient };
