import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : req.query.token;

    if (!token) {
      return res.sendStatus(401);
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

export default authMiddleware;
