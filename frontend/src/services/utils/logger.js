// Function to log info and errors to the console for debugging
export const logInfo = (message, data = {}) => {
  console.info(`[INFO]: ${message}`, data);
};

// Function to log errors to the console for debugging
export const logError = (message, data = {}) => {
  console.error(`[ERROR]: ${message}`, data);
};
