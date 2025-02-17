// controllers/authController.js
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// User Registration
export const registerUser = async (req, res) => {
  const { name, email, password, userType } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, role: userType });
    await user.save();

    // Respond with success message; frontend should then redirect to /login.
    res
      .status(201)
      .json({ message: "Registration successful. Please log in." });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// User Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.password) {
      return res
        .status(400)
        .json({
          message: "User registered with Google. Please use Google login.",
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    req.session.user = user; // Store session
    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
