import { useState } from "react";
import { isUserLoggedIn } from "../services/utils/userState";

const useSuccessAlert = () => {
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddSuccess = () => {
    setSuccessMessage("Currency added successfully!");
    clearMessageAfterTimeout();
  };

  const handleEditSuccess = () => {
    setSuccessMessage("Currency updated successfully!");
    clearMessageAfterTimeout();
  };

  const handleDeleteSuccess = () => {
    if (isUserLoggedIn()) {
      setSuccessMessage("Currency deleted successfully!");
      clearMessageAfterTimeout();
    }
  };

  const clearMessageAfterTimeout = () => {
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return {
    state: successMessage,
    handlers: {
      handleAddSuccess,
      handleEditSuccess,
      handleDeleteSuccess,
      clearMessageAfterTimeout,
      setSuccessMessage,
    },
  };
};

export default useSuccessAlert;
