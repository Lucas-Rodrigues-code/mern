const route = require("express").Router();

const userController = require("../controllers/user.controller");

route.post("/", userController.create);
route.get("/", userController.getAll);

module.exports = route;
