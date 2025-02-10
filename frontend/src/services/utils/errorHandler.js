import { logError } from "./logger";

// Function to handle API errors and log them
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with a status code outside the 2xx range

    logError("API Request Error", {
      status: error.response.status,
      data: error.response.data,
    });

    throw new Error(error.response.data.message || "API Error");
  } else if (error.request) {
    // Request was made but no response received

    logError("Network or Server Error", error.request);

    throw new Error("Network or Server Error");
  } else {
    logError("Unknown Error", error.message);

    throw new Error(error.message);
  }
};

export default handleApiError;
