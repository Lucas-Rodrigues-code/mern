import express from "express";
import {
  create,
  deleteNews,
  getAll,
  getNewsById,
  getNewsByTitle,
  getNewsByUser,
  likeNews,
  topNews,
  update,
} from "../controllers/news.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validId } from "../middlewares/global.middlewares.js";

const route = express.Router();

route.post("/", authMiddleware, create);
route.get("/", authMiddleware, getAll);
route.get("/top", authMiddleware, topNews);
route.get("/search", authMiddleware, getNewsByTitle);
route.get("/:id", validId, authMiddleware, getNewsById);
route.get("/by/user", authMiddleware, getNewsByUser);
route.patch("/:id", validId, authMiddleware, update);
route.delete("/:id", validId, authMiddleware, deleteNews);
route.patch("/like/:id", validId, authMiddleware, likeNews);
export default route;
