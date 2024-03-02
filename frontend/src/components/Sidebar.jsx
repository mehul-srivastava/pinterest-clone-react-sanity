import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";

import logo from "../assets/logo.png";
import { categories } from "../utils/data";

const isActiveStyle = `flex flex-row hover:text-black items-center px-3 text-md border-r-2 border-black font-extrabold`;
const isNotActiveStyle = `flex flex-row text-gray-500 items-center px-3 text-md`;

const Sidebar = ({ user, handleCloseSidebar }) => {
  return (
    <div className="flex flex-col h-full justify-between bg-white pt-4 pl-4 min-w-250 md:fixed top-0 left-0 overflow-y-auto">
      {/* Menu */}
      <div className="w-full bg-white">
        <Link to="/">
          <img src={logo} alt="logo" className="w-40 p-3" />
        </Link>
        <div className="flex flex-col gap-4 mt-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <AiTwotoneHome fontSize={16} />
            <span className="ml-4 text-md">Home</span>
          </NavLink>
          <h3 className="text-xs font-black text-gray-800 uppercase mt-8 mx-3 mr-14">
            Discover Categories
          </h3>
          {categories.map((item) => (
            <NavLink
              to={`category/${item.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={() => handleCloseSidebar(false)}
              key={item.name}
            >
              <span className="text-md">
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* User Info */}
      {user && (
        <Link
          to={`/user/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-3 items-center bg-gray-100 cursor-pointer rounded-lg shadow-xl mr-7"
          // onClick={() => handleCloseSidebar(false)}
        >
          <img src={user.image} className="w-8 rounded-md" alt="user-profile" />
          <p className="text-sm">{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
