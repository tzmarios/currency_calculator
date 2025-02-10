// Save token to local storage
export const setAuthToken = (token) => {
  localStorage.setItem("authToken", token);
};

// Retrieve token from local storage for requests
export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Remove token (e.g., on logout)
export const removeAuthToken = () => {
  localStorage.removeItem("authToken");
};
