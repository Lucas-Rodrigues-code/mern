import express from "express";
import { create, getAll } from "../controllers/news.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const route = express.Router();

route.post("/", authMiddleware, create);
route.get("/", authMiddleware, getAll);

export default route;
