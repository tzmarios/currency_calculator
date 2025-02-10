// Check if user is logged in and return true or false
import { getAuthToken } from "./tokenManager";

export const isUserLoggedIn = () => {
  return getAuthToken() !== null;
};
