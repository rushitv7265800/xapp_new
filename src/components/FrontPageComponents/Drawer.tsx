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
  FaHistory,
} from "react-icons/fa";
import Image from "../../components/utils/customComponent/Image";
import CategoryIcon from "../../assets/drawer/CategoryIcon.png";
import HashIcon from "../../assets/drawer/hash.png";
import YoutubeLogo from "../../assets/FrontpageIcons/headerLogo.png";
import HeadphonesIcon from "../../assets/drawer/headphones.png";
import DollerIcon from "../../assets/drawer/dollar-sign.png";
import PronstarIcon from "../../assets/drawer/plus-square.png";
import ImageIcon from "../../assets/drawer/imageIcon.png";
import { NavLink, useNavigate } from "react-router-dom";

const Drawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
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
        style={{ zIndex: "9999" }}
      >
        {/* Header with Logo and Close Button */}
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center">
            <img
              src={YoutubeLogo}
              alt="Drawer Logo"
              style={{ width: "50%", height: "100%" }}
            />
          </div>
          <button
            className="text-4xl mt-1 text-gray-400 hover:text-white"
            onClick={toggleDrawer}
          >
            ×
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex flex-col  px-4 py-2 space-y-4">
          {/* Search Input */}
          <div className="flex items-center space-x-2 border-b border-gray-500 pb-2 md:hidden">
            <FaSearch />
            <input
              type="text"
              placeholder="Search here..."
              className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none cursor-pointer"
            />
          </div>

          {/* Menu Items */}
          <button
            className="flex items-center space-x-2"
            style={{ marginTop: "20px" }}
            onClick={() => navigate("/user/categories")}
          >
            <img src={CategoryIcon} />
            <span>Categories</span>
          </button>
          <button
            className="flex items-center space-x-2"
            style={{ marginTop: "20px" }}
          >
            <img src={HashIcon} />
            <span>Discover</span>
          </button>
          <button
            className="flex items-center space-x-2"
            style={{ marginTop: "20px" }}
          >
            <img src={HeadphonesIcon} />
            <span>History</span>
          </button>
          <button
            className="flex items-center space-x-2"
            style={{ marginTop: "20px" }}
          >
            <img src={DollerIcon} />
            <span>Best of</span>
          </button>
          <button
            className="flex items-center space-x-2"
            style={{ marginTop: "20px" }}
          >
            <img src={PronstarIcon} />
            <span>Portstars</span>
          </button>
          <button
            className="flex items-center space-x-2"
            style={{ marginTop: "20px" }}
          >
            <img src={ImageIcon} />
            <span>Images</span>
          </button>
          <button
            className="flex items-center space-x-2"
            onClick={() => navigate("/user/videosUpload")}
            style={{ marginTop: "20px" }}
          >
            <FaUpload />
            <span>Upload Video</span>
          </button>
          <button
            className="flex items-center space-x-2"
            onClick={() => navigate("/user/shortsUpload")}
            style={{ marginTop: "20px" }}
          >
            <FaUpload />
            <span>Upload Short</span>
          </button>
          {/* <button className="flex items-center space-x-2" style={{marginTop:"20px"}}>
            <FaPhotoVideo />
            <span>Photos</span>
          </button> */}
          <button
            className="flex items-center space-x-2"
            style={{ marginTop: "20px" }}
          >
            <FaUserFriends />
            <span>My Subscriptions</span>
          </button>
          <NavLink
            to="/user/history"
            className="flex items-center space-x-2"
            style={{ marginTop: "20px" }}
          >
            <FaHistory />
            <span>History</span>
          </NavLink>
          {/* Login/Signup Button */}
          {/* <button className="w-full py-2 text-center bg-purple-600 rounded-md hover:bg-purple-700">
            Log in / Sign up
          </button> */}
        </div>
        <div className="drawerBottomNavigation">
          <ul>
            <li>Blog</li>
            <li>Partners</li>
            <li>English</li>
          </ul>
          <ul>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
