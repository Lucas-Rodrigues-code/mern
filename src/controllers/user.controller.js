const userServices = require("../services/user.service");

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
  const { user } = req;

  res.send(user);
}

async function update(req, res) {
  const { name, email, password, userName, avatar, background } = req.body;
  
  if (!name && !userName && !email && !password && !avatar && !background) {
    return res.status(400).send("one or more fields are required");
  }

  const { id } = req;
  
  await userServices.updateService({
    id,
    name,
    email,
    password,
    userName,
    avatar,
    background,
  });
  res.send({ message: "User updated" });
}

module.exports = { create, getAll, getUsersById, update };
