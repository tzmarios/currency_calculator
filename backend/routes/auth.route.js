import express from "express";
import { authCtrl } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", authCtrl.registerUser);
router.post("/login", authCtrl.loginUser);

export const authRoute = router;
