import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUserAsync, Status } from "../features/User/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router";
import { Button, CircularProgress } from "@nextui-org/react";
import { motion } from "framer-motion";

function MyProfile() {
  const userdata = useSelector(selectUser);
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState(null);
  // const status = useSelector(Status)
  // const [LoadingForProfile,setLoadingForProfile] = useState
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const status = useSelector(Status);

  useEffect(() => {
    if (userdata) {
      setProfileData({ ...userdata });
    }
  }, [userdata]);

  const notify = (message, type) => toast(message, { type: type });

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const toastId = toast.loading("Uploading image...");

    try {
      setLoading(true);

      const response = await axios.post("https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/bloge/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response && response.data.image) {
        setProfileData({ ...profileData, image: response.data.image });
        toast.update(toastId, {
          render: "Image uploaded successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);

      toast.update(toastId, {
        render: "Error uploading image!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserAsync(profileData));
    if (status === "fulfilled") notify("Profile updated successfully", "success");
  };
  if (status == 'pending') {
    return <div className='flex items-center justify-center w-full h-screen'><CircularProgress size='lg' aria-label="Loading..." /></div>
  }
  return (
    <div>
      {
        status != 'fulfilled' ? (
          <div className='flex items-center justify-center w-full h-screen'><CircularProgress size='lg' aria-label="Loading..." /></div>
        ) : (<div className="min-h-screen bg-gray-100 py-10">
          <motion.div
            className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center items-center mb-6">
              {/* Profile Image */}
              <div className="relative w-32 h-32 mx-auto">
                {/* Profile Image */}
                <motion.img
                  src={profileData?.image != null ? profileData?.image : 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-blue-500 transition-transform duration-300 ease-in-out transform hover:scale-110"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Edit Icon */}
                <label
                  htmlFor="profile-image-upload"
                  className="absolute bottom-0 right-0 bg-blue-500 text-white p-3 rounded-full cursor-pointer transition-transform transform hover:scale-110 shadow-lg flex items-center justify-center"
                >
                  {/* Camera Icon for Upload */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4h16c1.1 0 1.99.9 1.99 2L22 18c0 1.1-.89 2-1.99 2H4c-1.1 0-2-.89-2-2L2 6c0-1.1.9-2 2-2zm8 13c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                    />
                  </svg>
                </label>

                {/* Hidden Input for File Upload */}
                <input
                  type="file"
                  id="profile-image-upload"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* User Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={profileData?.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={profileData?.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={profileData?.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Bio Section */}
              <div className="mb-6">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={profileData?.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  rows="4"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  isLoading={status == 'pending'}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Save Changes
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
          <ToastContainer />
        </div>)
      }
    </div>
  );
}

export default MyProfile;
