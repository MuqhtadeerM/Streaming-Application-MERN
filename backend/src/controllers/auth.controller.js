import { ENV } from "../config/env.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

// Register the User
export const register = async (req, res) => {
  try {
    const { name, email, password, role, tenantId } = req.body;

    //   check user exists alread
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      tenantId,
    });

    res.status(201).json({
      message: "User Registered Successfuly",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Registration Failed" });
  }
};

// Logini user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Crendentials" });
    }

    //   Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        tenantId: user.tenantId,
      },
      ENV.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
};
