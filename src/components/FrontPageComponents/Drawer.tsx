import React, { useState } from "react";
import drwerLogo from "../../assets/Image/drwerlogo.png";
import {
  FaSearch,
  FaThLarge,
  FaHashtag,
  FaHeadphones,
  FaDollarSign,
  FaVideo,
  FaComments,
  FaUpload,
  FaPhotoVideo,
  FaUserFriends,
} from "react-icons/fa";
import Image from "../../components/utils/customComponent/Image";

const Drawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative md:hidden">
      {/* Hamburger Icon */}
      <button
        className="text-white text-3xl p-2 rounded-md"
        onClick={toggleDrawer}
      >
        ☰
      </button>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        {/* Header with Logo and Close Button */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Image src={drwerLogo} alt="Drawer Logo" className="h-12 w-12" />
          </div>
          <button
            className="text-4xl text-gray-400 hover:text-white"
            onClick={toggleDrawer}
          >
            ×
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex flex-col p-4 space-y-4">
          {/* Search Input */}
          <div className="flex items-center space-x-2 border-b border-gray-500 pb-2">
            <FaSearch/>
            <input
              type="text"
              placeholder="Search here..."
              className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none cursor-pointer"
            />
          </div>

          {/* Menu Items */}
          <button className="flex items-center space-x-2">
            <FaThLarge />
            <span>Categories</span>
          </button>
          <button className="flex items-center space-x-2">
            <FaHashtag />
            <span>Discover</span>
          </button>
          <button className="flex items-center space-x-2">
            <FaHeadphones />
            <span>Playlists</span>
          </button>
          <button className="flex items-center space-x-2">
            <FaDollarSign />
            <span>Become a Creator</span>
          </button>
          <button className="flex items-center space-x-2">
            <FaVideo />
            <span>Porn GIFS & Videos</span>
          </button>
          <button className="flex items-center space-x-2">
            <FaComments />
            <span>Online Girls</span>
          </button>
          <button className="flex items-center space-x-2">
            <FaUpload />
            <span>Upload Video</span>
          </button>
          <button className="flex items-center space-x-2">
            <FaPhotoVideo />
            <span>Photos</span>
          </button>
          <button className="flex items-center space-x-2">
            <FaUserFriends />
            <span>My Subscriptions</span>
          </button>

          {/* Login/Signup Button */}
          <button className="w-full py-2 text-center bg-purple-600 rounded-md hover:bg-purple-700">
            Log in / Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
