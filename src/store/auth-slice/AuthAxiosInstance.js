import axios from "axios";
import API_URL from "../../utils/api";

const AuthAxiosInstance = axios.create({
  baseURL: API_URL,
});

// Request interceptor (optional, add Authorization if token exists)
AuthAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: refresh token when 401
AuthAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token expired
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const res = await axios.post(`${API_URL}token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = res.data.access;
        localStorage.setItem("accessToken", newAccessToken);

        // Update header and retry
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return AuthAxiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token expired or invalid
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth/login"; // Optional logout redirect
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default AuthAxiosInstance;
