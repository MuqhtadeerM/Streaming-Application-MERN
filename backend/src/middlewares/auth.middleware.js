import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

const authMiddleware = () => {
  try {
    // get tokken from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "Access denied. no token recieved" });
    }

    // extract token
    const token = authHeader.split(" ")[1];

    // verify the tocken
    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    req.user = decoded;

    //   continuew to next middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired Tocken" });
  }
};

export default authMiddleware;
