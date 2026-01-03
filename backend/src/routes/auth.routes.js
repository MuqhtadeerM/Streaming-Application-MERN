import express from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = express.Router();

// Register New User
router.post("/register", register);

// Login User
router.post("/login", login);

export default router;
