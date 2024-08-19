const User = require("../models/User");

function create(body) {
  return User.create(body);
}

function getAll() {
  return User.find();
}

function getUsersById(id) {
  return User.findById(id);
}

function updateService({
  id,
  name,
  email,
  password,
  userName,
  avatar,
  background,
}) {
  return User.findOneAndUpdate(
    { _id: id },
    {
      name,
      email,
      password,
      userName,
      avatar,
      background,
    }
  );
}

module.exports = {
  create,
  getAll,
  getUsersById,
  updateService,
};
