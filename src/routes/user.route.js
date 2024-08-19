const route = require("express").Router();
const userController = require("../controllers/user.controller");
const { validId, validUser } = require("../middlewares/global.middlewares");

route.post("/", userController.create);
route.get("/", userController.getAll);
route.get("/:id", validId, validUser, userController.getUsersById);
route.patch("/:id", validId, validUser, userController.update);

module.exports = route;
