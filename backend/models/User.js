// models/User.js
import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    start: String,
    end: String,
    description: String,
  },
  { _id: false }
);

const EducationSchema = new mongoose.Schema(
  {
    institution: String,
    degree: String,
    year: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false },
  googleId: { type: String },
  role: {
    type: String,
    enum: ["jobSeeker", "employer", "admin"],
    default: "jobSeeker",
  },
  // Profile fields:
  profileImage: String,
  title: String,
  location: String,
  phone: String,
  about: String,
  experience: [ExperienceSchema],
  education: [EducationSchema],
  skills: [String],
  certifications: [String],
  resume: String,
  // Authentication/verification fields:
  isVerified: { type: Boolean, default: false },
  authMethod: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
