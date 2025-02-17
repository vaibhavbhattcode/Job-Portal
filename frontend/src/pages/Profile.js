import React, { useState, useEffect } from "react";
import axios from "axios";
import { CameraIcon, PencilIcon } from "@heroicons/react/24/outline";

const ProfilePage = () => {
  // Main profile state & UI controls
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  // Local state for form edits (so changes aren’t immediately saved)
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [error, setError] = useState(null);

  // On mount, fetch profile from backend (session maintained via cookies)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/profile",
          { withCredentials: true }
        );
        setProfileData(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Toggle edit mode and copy existing profile data to editData
  const handleEditToggle = () => {
    if (!editMode && profileData) {
      setEditData({ ...profileData });
    }
    setEditMode(!editMode);
  };

  // Handle input changes for simple text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // For skills/certifications fields (handled as comma-separated strings)
  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    const arr = value.split(",").map((item) => item.trim());
    setEditData((prev) => ({ ...prev, [name]: arr }));
  };

  // Save updated profile to backend
  const handleSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/user/profile",
        editData,
        { withCredentials: true }
      );
      setProfileData(response.data);
      setEditMode(false);
    } catch (err) {
      console.error(err);
      setError("Failed to update profile.");
    }
  };

  // Handle profile photo upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("profilePhoto", file);
    try {
      setUploadingPhoto(true);
      const response = await axios.post(
        "http://localhost:5000/api/user/profile/upload-photo",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // Update the profile picture on success
      setProfileData((prev) => ({
        ...prev,
        profilePicture: response.data.profilePicture,
      }));
    } catch (err) {
      console.error(err);
      setError("Photo upload failed.");
    } finally {
      setUploadingPhoto(false);
    }
  };

  // Handle resume upload
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("resume", file);
    try {
      setUploadingResume(true);
      const response = await axios.post(
        "http://localhost:5000/api/user/profile/upload-resume",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProfileData((prev) => ({
        ...prev,
        resume: response.data.resume,
      }));
    } catch (err) {
      console.error(err);
      setError("Resume upload failed.");
    } finally {
      setUploadingResume(false);
    }
  };

  // Remove the resume from the user’s profile
  const handleResumeRemove = async () => {
    try {
      await axios.delete("http://localhost:5000/api/user/profile/resume", {
        withCredentials: true,
      });
      setProfileData((prev) => ({ ...prev, resume: null }));
    } catch (err) {
      console.error(err);
      setError("Failed to remove resume.");
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!profileData) {
    return <div className="p-4">No profile data available</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 relative">
          <div className="flex items-start gap-6">
            <div className="relative">
              <img
                src={
                  profileData.profilePicture ||
                  "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <input
                type="file"
                accept="image/*"
                id="photoUpload"
                className="hidden"
                onChange={handlePhotoUpload}
              />
              <label
                htmlFor="photoUpload"
                className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition cursor-pointer"
              >
                <CameraIcon className="w-5 h-5" />
              </label>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                        className="text-3xl font-bold text-gray-900 border-b border-gray-300 focus:outline-none"
                      />
                      <input
                        type="text"
                        name="title"
                        value={editData.title}
                        onChange={handleInputChange}
                        className="text-xl text-gray-600 mt-1 border-b border-gray-300 focus:outline-none"
                      />
                      <div className="mt-2 space-y-1">
                        <input
                          type="text"
                          name="location"
                          value={editData.location}
                          onChange={handleInputChange}
                          className="text-gray-500 border-b border-gray-300 focus:outline-none"
                          placeholder="Location"
                        />
                        <input
                          type="email"
                          name="email"
                          value={editData.email}
                          onChange={handleInputChange}
                          className="text-gray-500 border-b border-gray-300 focus:outline-none"
                          placeholder="Email"
                        />
                        <input
                          type="text"
                          name="phone"
                          value={editData.phone}
                          onChange={handleInputChange}
                          className="text-gray-500 border-b border-gray-300 focus:outline-none"
                          placeholder="Phone"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <h1 className="text-3xl font-bold text-gray-900">
                        {profileData.name}
                      </h1>
                      <p className="text-xl text-gray-600 mt-1">
                        {profileData.title}
                      </p>
                      <p className="text-gray-500 mt-2">
                        <span className="mr-4">📍 {profileData.location}</span>
                        <span className="mr-4">✉️ {profileData.email}</span>
                        <span>📱 {profileData.phone}</span>
                      </p>
                    </>
                  )}
                </div>
                <button
                  onClick={handleEditToggle}
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <PencilIcon className="w-5 h-5 mr-2" />
                  {editMode ? "Cancel" : "Edit Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">About Me</h2>
              {editMode ? (
                <textarea
                  name="about"
                  value={editData.about}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none"
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  {profileData.about}
                </p>
              )}
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Work Experience</h2>
                {/* Future editing capability can be added here */}
                <button className="text-blue-500 hover:text-blue-600">
                  <PencilIcon className="w-5 h-5" />
                </button>
              </div>
              {profileData.experience && profileData.experience.length > 0 ? (
                profileData.experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="mb-4 pb-4 border-b last:border-0"
                  >
                    <h3 className="font-semibold text-lg">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">
                      {exp.start} - {exp.end}
                    </p>
                    <p className="mt-2 text-gray-600">{exp.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No work experience added.</p>
              )}
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Education</h2>
                <button className="text-blue-500 hover:text-blue-600">
                  <PencilIcon className="w-5 h-5" />
                </button>
              </div>
              {profileData.education && profileData.education.length > 0 ? (
                profileData.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="mb-4 pb-4 border-b last:border-0"
                  >
                    <h3 className="font-semibold text-lg">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No education details added.</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Skills Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Skills</h2>
                <button className="text-blue-500 hover:text-blue-600">
                  <PencilIcon className="w-5 h-5" />
                </button>
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="skills"
                  value={editData.skills.join(", ")}
                  onChange={handleArrayChange}
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none"
                  placeholder="Enter skills separated by commas"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profileData.skills &&
                    profileData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              )}
            </div>

            {/* Certifications Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Certifications</h2>
                <button className="text-blue-500 hover:text-blue-600">
                  <PencilIcon className="w-5 h-5" />
                </button>
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="certifications"
                  value={editData.certifications.join(", ")}
                  onChange={handleArrayChange}
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none"
                  placeholder="Enter certifications separated by commas"
                />
              ) : (
                <div className="space-y-2">
                  {profileData.certifications &&
                    profileData.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center">
                        <span className="mr-2">🎓</span>
                        <span className="text-gray-600">{cert}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Resume Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Resume</h2>
                <button className="text-blue-500 hover:text-blue-600">
                  <PencilIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {profileData.resume ? (
                  <div className="text-blue-500">
                    📄 {profileData.resume}
                    <button
                      onClick={handleResumeRemove}
                      className="ml-2 text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-500 mb-2">
                      Upload your resume (PDF only)
                    </p>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleResumeUpload}
                      className="hidden"
                      id="resumeUpload"
                    />
                    <label
                      htmlFor="resumeUpload"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
                    >
                      {uploadingResume ? "Uploading..." : "Upload Resume"}
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        {editMode && (
          <div className="mt-6 text-right">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
