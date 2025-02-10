import { Currency, currencySchema } from "../models/currency.model.js";

/**
 * @typedef {Object} ICurrency
 * @property {string} _id
 * @property {string} name
 * @property {string} code
 * @property {number} exRate
 */

// Add new currency
const addCurrency = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: "Request body is missing.",
    });
  }

  const { error } = currencySchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const { name, code, exRate } = req.body;

  try {
    /** @type {ICurrency | null} */
    const currency = new Currency({ name, code, exRate });
    await currency.save();
    res.status(201).json({
      success: true,
      data: currency.code,
      message: `Currency with ${currency._id} added.`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get all currencies
const getAllCurrencies = async (req, res) => {
  try {
    /** @type {ICurrency[]} */
    const currencies = await Currency.find();

    res.status(200).json({ success: true, data: currencies });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get a specific currency
const getCurrency = async (req, res) => {
  try {
    /** @type {ICurrency | null} */
    const currency = await Currency.findById(req.params.id);
    if (!currency)
      return res
        .status(404)
        .json({ success: false, message: "Currency not found." });

    res.status(200).json({
      success: true,
      data: currency,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update a currency
const updateCurrency = async (req, res) => {
  const { error } = currencySchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  const { name, code, exRate } = req.body;

  try {
    /** @type {ICurrency | null} */
    const currency = await Currency.findByIdAndUpdate(
      req.params.id,
      { name, code, exRate },
      { new: true }
    );
    if (!currency)
      return res.status(404).json({
        success: false,
        message: "Currency not found.",
      });

    res.status(200).json({ success: true, data: currency });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete a currency
const deleteCurrency = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({
      success: false,
      message: "Currency ID is missing.",
    });
  }

  try {
    /** @type {ICurrency | null} */
    const currency = await Currency.findByIdAndDelete(req.params.id);

    if (!currency)
      return res.status(404).json({
        success: false,
        message: "Currency not found.",
      });

    res.status(200).json({
      success: true,
      message: `Currency ${currency.code} deleted.`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Convert currency
const convertCurrency = async (req, res) => {
  const { fromCurrency, toCurrency, amount } = req.body;

  try {
    /** @type {ICurrency | null} */
    const fromCurrencyEntry = await Currency.findOne({ code: fromCurrency });
    /** @type {ICurrency | null} */
    const toCurrencyEntry = await Currency.findOne({ code: toCurrency });

    console.log(fromCurrencyEntry, toCurrencyEntry);

    if (!fromCurrencyEntry || !toCurrencyEntry)
      return res.status(404).json({
        success: false,
        message: "Currency pair not found.",
      });

    if (isNaN(amount))
      return res.status(400).json({
        success: false,
        message: "Amount must be a number.",
      });

    const rate = toCurrencyEntry.exRate / fromCurrencyEntry.exRate;
    const convertedAmount = amount * rate;
    console.log(convertedAmount, rate);

    res.status(200).json({
      success: true,
      data: { convertedAmount },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const currencyCtrl = {
  addCurrency,
  getAllCurrencies,
  getCurrency,
  updateCurrency,
  deleteCurrency,
  convertCurrency,
};
