import apiClient from '../utils/apiClient';
import { setAuthToken } from '../utils/tokenManager';
import handleApiError  from "../utils/errorHandler";

export const login = async (username, password) => {
  try {
    const response = await apiClient.post("/auth/login", { username, password });
    if (response.data.token) {
      setAuthToken(response.data.token);
    }
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

export const register = async (username, password) => {
  try {
    const response = await apiClient.post("/auth/register", { username, password });
    return response;
  } catch (error) {
    handleApiError(error);
  }
};