import User from "../models/User.js";

function findUserByEmail(email) {
  return User.findOne({ email }).select("+password");
}

export { findUserByEmail };
