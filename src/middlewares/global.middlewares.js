const mongoose = require("mongoose");
const userServices = require("../services/user.service");

function validId(req, res, next) {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  next();
}

async function validUser(req, res, next) {
  const { id } = req.params;
  const user = await userServices.getUsersById(id);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  req.id = id;
  req.user = user;
  next();
}

module.exports = { validId, validUser };
