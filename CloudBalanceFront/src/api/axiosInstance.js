import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("auth");
  localStorage.removeItem("firstName");
  localStorage.removeItem("lastName");
  localStorage.removeItem("expiresAt");
  window.location.href = "/";
}

// REQUEST INTERCEPTOR - Add JWT token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const expiresAt = Number(localStorage.getItem("expiresAt"));

    // check token for login endpoints
    const isAuthEndpoint = config.url?.includes("/auth/login");

    if (isAuthEndpoint) {
      // Allow login without token
      return config;
    }

    // Check token expiry only for protected endpoints
    if (!token || Date.now() > Number(expiresAt)) {
      logoutUser();
      throw new axios.Cancel("Token expired please login again");
    }

    // Add token to request
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR - Handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);

    // Handle token expiration
    if (error.response?.status === 401) {
      logoutUser();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
