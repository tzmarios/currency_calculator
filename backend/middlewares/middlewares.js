import express from "express";
import cors from "cors";

const middlewares = (app) => {
  app.use(express.json());
  app.use(cors());
};

export default middlewares;
