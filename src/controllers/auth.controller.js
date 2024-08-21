import bcrypt from "bcrypt";
import { findUserByEmail, generateToken } from "../services/auth.service.js";

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

    const token = generateToken(user);

    res.send({ token });
  } catch (error) {
    console.error(error, "Error logging in");
    res.status(500).send("Internal server error");
  }
}

export { login };
