const User = require("../models/User");

function create(body) {
  return User.create(body);
}

module.exports = {
  create,
};
