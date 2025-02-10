import React, { useState } from "react";
import CurrencyModal from "./Modals/CurrencyModal.jsx";
import PromptModal from "./Modals/PromptModal.jsx";
import SuccessAlert from "./Modals/SuccessAlert.jsx";
import useSuccessAlert from "../hooks/useSuccessAlert.jsx";
import { Fade } from "react-awesome-reveal";

const CurrencyList = ({ stateProps, handlerProps, currencies }) => {
  const {
    isAddModalOpen,
    isEditModalOpen,
    currentCurrency,
    isLoginRequiredModalOpen,
  } = stateProps;

  const {
    handleAddCurrency,
    handleEdit,
    handleDelete,
    setIsAddModalOpen,
    setIsEditModalOpen,
    handleSaveNewCurrency,
    handleSubmitUpdate,
    setCurrentCurrency,
    handleLoginRequiredModalClose,
  } = handlerProps;

  const { state: successMessage, handlers: handlers } = useSuccessAlert();

  const {
    handleAddSuccess,
    handleEditSuccess,
    handleDeleteSuccess,
    clearMessageAfterTimeout,
    setSuccessMessage,
  } = handlers;

  return (
    <div className="flex flex-col items-center justify-center mt-10 bg-gradient-to-r from-slate-600 to-slate-700 p-4">
      <div className="w-full max-w-3xl px-4 py-6 md:px-20 md:py-10">
        <Fade triggerOnce>
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            Configuration
          </h1>
        </Fade>
        <Fade triggerOnce>
          <div className="flex justify-center mt-6 mb-10">
            <button
              onClick={handleAddCurrency}
              className="bg-green-500 text-white px-10 py-2 md:px-20 md:py-4 rounded-lg hover:bg-green-600 transition duration-300 font-semibold text-lg cursor-pointer"
            >
              Add Currency
            </button>
          </div>
        </Fade>
        <Fade triggerOnce>
          <div className="w-full max-w-xl bg-white p-4 md:p-6 rounded-lg shadow-xl">
            <ul className="space-y-4">
              {currencies.map((currency) => (
                <li
                  key={currency._id}
                  className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-100 rounded-lg shadow"
                >
                  <span className="text-lg font-semibold mb-2 md:mb-0">
                    {currency.name} ({currency.code})
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(currency)}
                      className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition duration-300 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(currency);
                        handleDeleteSuccess();
                      }}
                      className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Fade>
        <CurrencyModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={() => {
            handleSaveNewCurrency(currentCurrency);
            handleAddSuccess();
          }}
          currency={currentCurrency}
          setCurrency={setCurrentCurrency}
          title="Add Currency"
          setSuccessMessage={setSuccessMessage}
        />
        <CurrencyModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(currency) => {
            handleSubmitUpdate(currency);
            handleEditSuccess();
          }}
          currency={currentCurrency}
          setCurrency={setCurrentCurrency}
          title="Edit Currency"
          isEditMode={true}
          setSuccessMessage={setSuccessMessage}
        />
        <PromptModal
          isOpen={isLoginRequiredModalOpen}
          onClose={handleLoginRequiredModalClose}
          title="Login Required"
          text="You need to login for this action."
        />
        <SuccessAlert
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      </div>
    </div>
  );
};

export default CurrencyList;
