import express from "express";
import userController from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const route = express.Router();

route.post("/", userController.create);
route.get("/", authMiddleware, userController.getAll);
route.get(
  "/:id",
  validId,
  validUser,
  authMiddleware,
  userController.getUsersById
);
route.patch("/:id", validId, validUser, authMiddleware, userController.update);

export default route;

/* "/user": {},
    "/user/{id}/": {},
    "/user/{id}": {},
    "/auth": {},
    "news/": {},
    "news": {},
    "news/top": {},
    "news/search": {},
    "news/byUser": {},
    "news/{id}/": {},
    "news/{id}": {},
    "news/{id}/": {},
    "news/{id}/like/{id}": {},
    "news/{id}/comment/{id}": {},
    "news/{id}/comment/{idNews}/{idComment}": {} */