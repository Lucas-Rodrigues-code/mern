import express from "express";

import { login } from "../controllers/auth.controller.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";

const route = express.Router();

route.post("/login",login);

export default route;