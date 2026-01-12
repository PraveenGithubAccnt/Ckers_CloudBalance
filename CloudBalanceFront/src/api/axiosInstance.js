import axios from "axios";
import { logout } from "../redux/slice/authSlice";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Inject Redux store
let store;
export const injectStore = (_store) => {
  store = _store;
};

const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresAt");

  if (store) {
    store.dispatch(logout());
  }
  // cross-tab logout
  localStorage.setItem("logout", Date.now().toString());
  window.location.href = '/';
};

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    // Allow login endpoint
    if (config.url?.includes("/auth/login")) {
      return config;
    }

    const token = localStorage.getItem("token");
    const expiresAt = localStorage.getItem("expiresAt");

    // Check if token exists
    if (!token) {
      logoutUser();
      return Promise.reject(new Error("No token found"));
    }

    // Check token expiration only if expiresAt is set
    if (expiresAt && Date.now() > Number(expiresAt)) {
      logoutUser();
      return Promise.reject(new Error("Session expired"));
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      toast.error(error.response?.data?.message || "Unauthorized");
      logoutUser();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;