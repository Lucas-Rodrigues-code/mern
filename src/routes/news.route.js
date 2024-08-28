import express from "express";
import {
  addComment,
  create,
  deleteComment,
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

route.post("/create", authMiddleware, create);
route.get("/", getAll);
route.get("/top", topNews);
route.get("/search", getNewsByTitle);
route.get("/:id", validId, getNewsById);
route.get("/by/user", authMiddleware, getNewsByUser);

route.patch("/update/:id", validId, authMiddleware, update);
route.delete("/delete/:id", validId, authMiddleware, deleteNews);
route.patch("/like/:id", validId, authMiddleware, likeNews);
route.patch("/comments/:id", validId, authMiddleware, addComment);
route.patch("/comments/:id/:idComment", validId, authMiddleware, deleteComment);
export default route;
