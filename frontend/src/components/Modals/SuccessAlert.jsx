import React from "react";

const SuccessAlert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-x-0 top-0 flex items-center justify-center mt-4">
      <div className="bg-green-600 text-white p-3 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <span>{message}</span>
          <button onClick={onClose} className="ml-4 bg-transparent text-lg">
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessAlert;
