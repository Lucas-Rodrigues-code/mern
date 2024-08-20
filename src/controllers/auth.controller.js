import bcrypt from "bcrypt";
import { findUserByEmail } from "../services/auth.service.js";

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User or password not found" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "User or password not found" });
    }
    res.send("ok");
  } catch (error) {
    console.error(error, "Error logging in");
    res.status(500).send("Internal server error");
  }
}

export { login };
