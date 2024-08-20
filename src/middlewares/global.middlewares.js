const mongoose = require("mongoose");
const userServices = require("../services/user.service");

function validId(req, res, next) {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    next();
  } catch (error) {
    console.error(error, "Error validating id");
    res.status(500).send("Internal server error");
  }
}

async function validUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await userServices.getUsersById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    req.id = id;
    req.user = user;
    next();
  } catch (error) {
    console.error(error, "Error validating user");
    res.status(500).send("Internal server error");
  }
}

module.exports = { validId, validUser };
