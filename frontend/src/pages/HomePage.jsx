import React from "react";
import CurrencyConverter from "../components/CurrencyConverter";
import useCurrencyConverter from "../hooks/useCurrencyConverter";
import useGetCurrencies from "../hooks/useGetCurrencies";

const HomePage = () => {
  const { state, handlers } = useCurrencyConverter();
  const { currencies } = useGetCurrencies();

  return (
    <CurrencyConverter
      stateProps={state}
      handlerProps={handlers}
      currencies={currencies}
    />
  );
};

export default HomePage;
