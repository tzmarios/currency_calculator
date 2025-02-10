import apiClient from '../utils/apiClient';
import handleApiError from '../utils/errorHandler';

export const getCurrencies = async () => {
  try {
    const response = await apiClient.get("/currency");
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

export const addCurrency = async (currency) => {
  try {
    const response = await apiClient.post("/currency", currency, {
      headers: { 'Requires-Auth': true }, 
    });
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateCurrency = async (currencyId, currency) => {
  try{
    const response = await apiClient.put(`/currency/${currencyId}`, currency, {
      headers: { 'Requires-Auth': true },
    });
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteCurrency = async (currencyId) => {
  try{
    const response = await apiClient.delete(`/currency/${currencyId}`, {
      headers: { 'Requires-Auth': true },
    });
    return response;
  }catch (error) {
    handleApiError(error);
  }
};

export const convertCurrency = async (data) => {
  try{
    const response = await apiClient.post('/currency/convert', data);
    return response;
  }catch (error) {
    handleApiError(error);
  }
};
