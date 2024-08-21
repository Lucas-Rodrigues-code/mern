import express from "express";
import { create, getAll } from "../controllers/news.controller.js";

const route = express.Router();

route.post("/", create);
route.get("/", getAll);

export default route;
