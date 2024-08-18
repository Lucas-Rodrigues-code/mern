const User = require("../models/User");

function create(body) {
  return User.create(body);
}

function getAll() {
  return User.find();
}

module.exports = {
  create,
  getAll,
};
