import React from "react";
import CurrencyList from "../components/CurrencyList.jsx";
import useCurrencyList from "../hooks/useCurrencyList.jsx";

const ConfigurationPage = () => {
  const { state, handlers } = useCurrencyList();

  return (
    <CurrencyList
      stateProps={state}
      handlerProps={handlers}
      currencies={state.currencies}
    />
  );
};

export default ConfigurationPage;
