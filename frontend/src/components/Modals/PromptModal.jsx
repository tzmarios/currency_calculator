import React from "react";

const PromptModal = ({ isOpen, onClose, title, text }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{text}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition duration-300 cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;
