import axios from "axios";
import { getAuthToken } from "./tokenManager";
import { logInfo, logError } from "./logger";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

// Request interceptor for endpoints
apiClient.interceptors.request.use(
  async (config) => {
    if (config.headers["Requires-Auth"]) {
      const token = getAuthToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      delete config.headers["Requires-Auth"];
    }
    logInfo("Request", {
      url: config.url,
      method: config.method,
      headers: config.headers,
    });
    return config;
  },
  async (error) => {
    logError("Request Error", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  async (response) => {
    logInfo("Response", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  async (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      window.location.href = "/login";
    }
    logError("Response Error", {
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export default apiClient;
