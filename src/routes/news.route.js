import express from "express";
import {
  create,
  getAll,
  getNewsById,
  topNews,
} from "../controllers/news.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validId } from "../middlewares/global.middlewares.js";

const route = express.Router();

route.post("/", authMiddleware, create);
route.get("/", authMiddleware, getAll);
route.get("/top", authMiddleware, topNews);
route.get("/:id", validId, authMiddleware, getNewsById);

export default route;
