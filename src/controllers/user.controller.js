import userServices from "../services/user.service.js";

async function create(req, res) {
  try {
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
  } catch (error) {
    console.error(error, "Error creating user");
    res.status(500).send("Internal server error");
  }
}

async function getAll(req, res) {
  try {
    const users = await userServices.getAll();
    if (!users) return res.status(400).send("Users not found");

    res.send(users);
  } catch (error) {
    console.error(error, "Error getting all users");
    res.status(500).send("Internal server error");
  }
}

async function getUsersById(req, res) {
  try {
    const { user } = req;

    res.send(user);
  } catch (error) {
    console.error(error, "Error getting user by id");
    res.status(500).send("Internal server error");
  }
}

async function update(req, res) {
  try {
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
  } catch (error) {
    console.error(error, "Error updating user");
    res.status(500).send("Internal server error");
  }
}

export default { create, getAll, getUsersById, update };
