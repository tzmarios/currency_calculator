import { useState, useEffect, useCallback } from "react";
import { getCurrencies } from "../services/api/currency";

const useGetCurrencies = () => {
  const [currencies, setCurrencies] = useState([]);

  const getAllCurrencies = useCallback(async () => {
    try {
      const response = await getCurrencies();
      setCurrencies(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getAllCurrencies();
  }, []);

  return {
    currencies,
    getAllCurrencies,
  };
};

export default useGetCurrencies;
