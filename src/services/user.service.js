import User from "../models/User.js";

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

function getUsersByEmail(email) {
  return User.findOne({ email });
}

export default {
  create,
  getAll,
  getUsersById,
  updateService,
  getUsersByEmail,
};
