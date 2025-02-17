import express from "express";
import passport from "passport";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// ✅ Email Registration & Login
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Check if user is logged in (but allow visitors)
router.get("/me", (req, res) => {
  res.json({ user: req.user || null }); // Returns null if no user is logged in
});

// ✅ Logout user & destroy session
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err)
      return res.status(500).json({ message: "Logout failed", error: err });

    req.session.destroy((err) => {
      if (err)
        return res.status(500).json({ message: "Error clearing session" });

      res.clearCookie("connect.sid"); // Clears session cookie
      return res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

// ✅ Google OAuth Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.FRONTEND_URL + "/login",
  }),
  (req, res) => {
    // Redirect to homepage after successful Google login
    res.redirect(`${process.env.FRONTEND_URL}/`);
  }
);

export default router;
