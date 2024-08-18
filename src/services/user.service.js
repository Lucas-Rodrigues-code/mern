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

module.exports = {
  create,
  getAll,
  getUsersById,
};
