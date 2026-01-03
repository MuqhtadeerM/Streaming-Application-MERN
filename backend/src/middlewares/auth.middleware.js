import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

const authMiddleware = (req, res, next) => {
  try {
    // GETTING TOCKEN
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided" });
    }
    
    // extract and decoding token
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
