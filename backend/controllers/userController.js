// controllers/userController.js
import User from "../models/User.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the logged-in user's profile (excluding password)
export const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
};

// Update the logged-in user's profile
export const updateProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const updatedData = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updatedData, {
      new: true,
      runValidators: true,
    }).select("-password");
    res.json(user);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error while updating profile" });
  }
};

// Configure multer storage for profile photo uploads
const photoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/photos");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `photo-${Date.now()}${ext}`);
  },
});
const photoUpload = multer({ storage: photoStorage });

// Upload profile photo
export const uploadPhoto = [
  photoUpload.single("profilePhoto"),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const user = await User.findById(req.user._id);
      if (!user) return res.status(404).json({ message: "User not found" });

      // Delete old photo if exists
      if (user.profileImage) {
        const oldPath = path.join(__dirname, "..", user.profileImage);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      user.profileImage = `/uploads/photos/${req.file.filename}`;
      await user.save();
      res.json({ profileImage: user.profileImage });
    } catch (error) {
      console.error("Error uploading photo:", error);
      res.status(500).json({ message: "Server error during photo upload" });
    }
  },
];

// Configure multer storage for resume uploads
const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `resume-${Date.now()}${ext}`);
  },
});
const resumeUpload = multer({ storage: resumeStorage });

// Upload resume file
export const uploadResume = [
  resumeUpload.single("resume"),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const user = await User.findById(req.user._id);
      if (!user) return res.status(404).json({ message: "User not found" });

      // Delete old resume if exists
      if (user.resume) {
        const oldPath = path.join(__dirname, "..", user.resume);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      user.resume = `/uploads/resumes/${req.file.filename}`;
      await user.save();
      res.json({ resume: user.resume });
    } catch (error) {
      console.error("Error uploading resume:", error);
      res.status(500).json({ message: "Server error during resume upload" });
    }
  },
];

// Remove resume file from profile
export const removeResume = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.resume) {
      const filePath = path.join(__dirname, "..", user.resume);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      user.resume = null;
      await user.save();
    }
    res.json({ message: "Resume removed" });
  } catch (error) {
    console.error("Error removing resume:", error);
    res.status(500).json({ message: "Server error while removing resume" });
  }
};
