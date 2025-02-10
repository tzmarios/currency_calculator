import express from "express";
import { currencyCtrl } from "../controllers/currency.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, currencyCtrl.addCurrency);
router.get("/", currencyCtrl.getAllCurrencies);
router.get("/:id", currencyCtrl.getCurrency);
router.put("/:id", authMiddleware, currencyCtrl.updateCurrency);
router.delete("/:id", authMiddleware, currencyCtrl.deleteCurrency);
router.post("/convert", currencyCtrl.convertCurrency);

export const currencyRoute = router;
