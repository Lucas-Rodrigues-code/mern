import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import userService from "../services/user.service.js";

function authMiddleware(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [scheme, token] = parts;

    if (scheme !== "Bearer") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const user = await userService.getUsersById(decoded.id);

      if (!user || !user._id) {
        return res.status(401).json({ message: "User not found" });
      }

      req.userId = user._id;
      return next();
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export default authMiddleware;
