const userServices = require("../services/user.service");
const mongoose = require("mongoose");

async function create(req, res) {
  const { name, email, password, userName, avatar, background } = req.body;

  if (!name || !userName || !email || !password || !avatar || !background) {
    return res.status(400).send("Missing required fields for user creation");
  }

  if (
    !email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    return res.status(400).send("Invalid email");
  }

  const user = await userServices.create(req.body);
  if (!user) return res.status(400).send("Error creating user");

  res.send({ user });
}

async function getAll(req, res) {
  const users = await userServices.getAll();
  if (!users) return res.status(400).send("Users not found");

  res.send(users);
}

async function getUsersById(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid id");
  
  const user = await userServices.getUsersById(id);
  if (!user) return res.status(400).send("User not found");

  res.send(user);
}

module.exports = { create, getAll, getUsersById };
