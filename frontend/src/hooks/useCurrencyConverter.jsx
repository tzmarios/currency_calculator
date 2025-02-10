import { useState } from "react";
import { convertCurrency } from "../services/api/currency";

const useCurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isCurrencySelectionModalOpen, setIsCurrencySelectionModalOpen] =
    useState(false);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
    setConvertedAmount(null);
  };

  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setConvertedAmount(null);
  };

  const handleConvert = async () => {
    try {
      const response = await convertCurrency({
        fromCurrency,
        toCurrency,
        amount,
      });
      const { convertedAmount } = response.data.data;
      setConvertedAmount(convertedAmount.toFixed(2));
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  };

  const handleConvertClick = () => {
    if (!fromCurrency || !toCurrency) {
      setIsCurrencySelectionModalOpen(true);
    } else {
      handleConvert();
    }
  };

  const handleCurrencySelectionModalClose = () => {
    setIsCurrencySelectionModalOpen(false);
  };

  return {
    state: {
      amount,
      fromCurrency,
      toCurrency,
      convertedAmount,
      isCurrencySelectionModalOpen,
    },
    handlers: {
      setAmount,
      setFromCurrency,
      setToCurrency,
      setConvertedAmount,
      handleAmountChange,
      handleSwapCurrencies,
      handleConvert,
      handleConvertClick,
      handleCurrencySelectionModalClose,
    },
  };
};

export default useCurrencyConverter;
