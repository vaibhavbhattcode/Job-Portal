// server.js
import dotenv from "dotenv";
dotenv.config(); // Must be at the very top!

import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import connectDB from "./config/db.js";
import "./config/passport.js"; // Loads Google OAuth strategy
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

connectDB();

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use("/uploads", express.static("uploads"));

// Session Middleware for Passport
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // In production, use secure cookies with HTTPS
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
