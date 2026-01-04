import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

const authMiddleware = (req, res, next) => {
  try {
    // GETTING TOCKEN
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : req.query.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided" });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
