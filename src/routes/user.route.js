const route = require("express").Router();

const userController = require("../controllers/user.controller");

route.post("/", userController.create);
route.get("/", userController.getAll);
route.get("/:id", userController.getUsersById);

module.exports = route;
