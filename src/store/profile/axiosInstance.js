import axios from "axios";
import API_URL from "../../utils/api";

const baseURL = API_URL || "https://ainogen.duckdns.org/";

const token = localStorage.getItem("accessToken") ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUxNjM0Njk4LCJpYXQiOjE3NTE2MzE2OTgsImp0aSI6IjhiODBkODNmZTcyYTQxZjU4ZjE5ZWQzNTAyZmE2NmIxIiwidXNlcl9pZCI6ImJlNjI3OGI0LWFiNTgtNDExYS05ODY4LTBiYTYyMDdkYzUxMiIsImZ1bGxfbmFtZSI6ImFiZG8gZXNtYWlsIiwiYmlvIjoiIiwiaW1hZ2UiOiJ1c2VyX2ltYWdlcy9TY3JlZW5zaG90XzIwMjUtMDUtMDFfMDEwMjQzX0F4cGJBMEkuanBnIiwidmVyaWZpZWQiOmZhbHNlLCJ1c2VybmFtZSI6ImFiZGVybGFobWFuIiwiZW1haWwiOiJ0ZXN0dXNlckBleGFtcGxlcy5jb20ifQ.CxMuV4pnFVLrK_EXrafPimCi45r1OSOmd157-Mxqn_U";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;