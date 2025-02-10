import React from "react";
import { FaExchangeAlt } from "react-icons/fa";
import PromptModal from "../components/Modals/PromptModal";
import { Fade } from "react-awesome-reveal";

const CurrencyConverter = ({ stateProps, handlerProps, currencies }) => {
  const {
    amount,
    fromCurrency,
    toCurrency,
    convertedAmount,
    isCurrencySelectionModalOpen,
    isLoginRequiredModalOpen,
  } = stateProps;

  const {
    setAmount,
    setFromCurrency,
    setToCurrency,
    handleAmountChange,
    handleSwapCurrencies,
    handleConvertClick,
    handleCurrencySelectionModalClose,
    handleLoginRequiredModalClose,
  } = handlerProps;

  return (
    <div className="flex items-center justify-center min-h-screen mt-10 bg-gradient-to-r from-slate-600 to-slate-700">
      <Fade>
        <div className="w-full max-w-lg p-6 md:p-10 bg-white border border-gray-300 rounded-2xl shadow-2xl transition-transform transform hover:shadow-2xl duration-500 hover:shadow-blue-700">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 md:mb-10 text-center text-gray-800">
            Currency Calculator
          </h1>
          <div className="mb-4 md:mb-8">
            <label className="block text-lg md:text-xl italic font-semibold mb-2 text-gray-700">
              Amount
            </label>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="w-full p-2 md:p-3 border border-gray-300 rounded-md"
              inputMode="numeric"
              pattern="\d*"
            />
          </div>
          <div className="mb-4 md:mb-8">
            <label className="block text-lg md:text-xl italic font-semibold mb-2 text-gray-700">
              From
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-2 md:p-3 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Select currency
              </option>
              {currencies.map((currency) => (
                <option key={currency._id} value={currency.code}>
                  {currency.name} ({currency.code})
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-center mb-4 md:mb-8">
            <button
              onClick={handleSwapCurrencies}
              className="px-4 py-2 md:px-6 md:py-3 border border-gray-300 rounded-full bg-slate-700 text-white font-semibold hover:bg-slate-600 transition-colors duration-300 flex items-center cursor-pointer"
            >
              <FaExchangeAlt className="mr-2" />
              Swap
            </button>
          </div>
          <div className="mb-4 md:mb-8">
            <label className="block text-lg md:text-xl italic font-semibold mb-2 text-gray-700">
              To
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-2 md:p-3 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Select currency
              </option>
              {currencies.map((currency) => (
                <option key={currency._id} value={currency.code}>
                  {currency.name} ({currency.code})
                </option>
              ))}
            </select>
          </div>

          <Fade triggerOnce>
            <div className="flex items-center justify-center mb-4 md:mb-8">
              <button
                onClick={handleConvertClick}
                className="px-4 py-2 md:px-15 md:py-3 border border-gray-300 rounded-full bg-green-600 text-white font-semibold hover:bg-green-800 transition-colors duration-300 cursor-pointer"
              >
                Convert
              </button>
            </div>
          </Fade>

          {convertedAmount !== null && (
            <Fade direction="up" cascade triggerOnce>
              <div className="text-center text-xl font-semibold text-gray-700 mt-4">
                {amount} {fromCurrency} = {convertedAmount} {toCurrency}
              </div>
            </Fade>
          )}
        </div>
      </Fade>
      <PromptModal
        isOpen={isLoginRequiredModalOpen}
        onClose={handleLoginRequiredModalClose}
        title="Login Required"
        text="You need to login for this action."
      />
      <PromptModal
        isOpen={isCurrencySelectionModalOpen}
        onClose={handleCurrencySelectionModalClose}
        title="Currency Selection Required"
        text="Please select both currencies before converting."
      />
    </div>
  );
};

export default CurrencyConverter;
