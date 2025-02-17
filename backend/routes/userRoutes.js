// routes/userRoutes.js
import express from "express";
import {
  getProfile,
  updateProfile,
  uploadPhoto,
  uploadResume,
  removeResume,
} from "../controllers/userController.js";

const router = express.Router();

// Middleware to require authentication (using Passport)
const requireUser = (req, res, next) => {
  if (req.user) return next();
  return res.status(401).json({ message: "Not authenticated" });
};

router.get("/profile", requireUser, getProfile);
router.put("/profile", requireUser, updateProfile);
router.post("/profile/upload-photo", requireUser, uploadPhoto);
router.post("/profile/upload-resume", requireUser, uploadResume);
router.delete("/profile/resume", requireUser, removeResume);

export default router;
