import express from "express";
import { authRoute } from "./auth.route.js";
import { currencyRoute } from "./currency.route.js";

const router = express.Router();

const routes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/currency",
    route: currencyRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
