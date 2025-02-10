import { useState } from "react";
import {
  deleteCurrency,
  addCurrency,
  updateCurrency,
} from "../services/api/currency";
import { isUserLoggedIn } from "../services/utils/userState.js";
import useGetCurrencies from "./useGetCurrencies.jsx";
import { useNavigate } from "react-router-dom";

const useCurrencyList = () => {
  const { currencies, getAllCurrencies } = useGetCurrencies();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoginRequiredModalOpen, setIsLoginRequiredModalOpen] =
    useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState({
    name: "",
    code: "",
    exRate: "",
  });
  const navigate = useNavigate();

  const handleEdit = (currency) => {
    if (!isUserLoggedIn()) {
      setIsLoginRequiredModalOpen(true);
    } else {
      setCurrentCurrency(currency);
      setIsEditModalOpen(true);
    }
  };

  const handleSubmitUpdate = async (currency) => {
    try {
      await updateCurrency(currency._id, {
        name: currency.name,
        code: currency.code,
        exRate: currency.exRate,
      });
      await getAllCurrencies();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update currency:", error);
    }
  };

  const handleDelete = async (currency) => {
    if (!isUserLoggedIn()) {
      setIsLoginRequiredModalOpen(true);
    } else {
      try {
        await deleteCurrency(currency._id);
        await getAllCurrencies();
      } catch (error) {
        console.error("Failed to delete currency:", error);
      }
    }
  };

  const handleAddCurrency = () => {
    if (!isUserLoggedIn()) {
      setIsLoginRequiredModalOpen(true);
    } else {
      setCurrentCurrency({ name: "", code: "", exRate: "" });
      setIsAddModalOpen(true);
    }
  };

  const handleSaveNewCurrency = async () => {
    try {
      await addCurrency(currentCurrency);
      await getAllCurrencies();
      console.log("Currency added:", currentCurrency);
      getAllCurrencies();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Failed to add currency:", error);
    }
  };

  const handleLoginRequiredModalClose = () => {
    setIsLoginRequiredModalOpen(false);
    navigate("/login");
  };

  return {
    state: {
      currencies,
      isAddModalOpen,
      isLoginRequiredModalOpen,
      isEditModalOpen,
      currentCurrency,
    },
    handlers: {
      handleAddCurrency,
      handleEdit,
      handleDelete,
      handleSubmitUpdate,
      handleSaveNewCurrency,
      handleLoginRequiredModalClose,
      setCurrentCurrency,
      setIsLoginRequiredModalOpen,
      setIsAddModalOpen,
      setIsEditModalOpen,
    },
  };
};

export default useCurrencyList;
