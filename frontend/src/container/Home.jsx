import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";

import { Sidebar, UserProfile } from "../components";
import Pins from "./Pins";
import logo from "../assets/logo.png";
import { fetchUser } from "../utils/fetchUser";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const userInfo = fetchUser();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      setUser({
        _id: userInfo.jti,
        image: userInfo.picture,
        userName: userInfo.name,
      });
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 h-screen">
      {/* Desktop Navbar */}
      <div className="hidden md:flex flex-col md:min-w-250">
        <Sidebar user={user && user} handleCloseSidebar={setToggleSidebar} />
      </div>

      {/* Mobile Navbar */}
      <div className="w-full shadow-sm md:hidden bg-white flex flex-row justify-between items-center p-3 relative">
        <HiMenu fontSize={30} onClick={() => setToggleSidebar(true)} />
        <Link to="/">
          <img src={logo} alt="logo" className="w-40" />
        </Link>
        <img src={user?.image} alt="user" className="w-10 rounded-md" />
        {toggleSidebar && (
          <div className="fixed border h-screen w-4/5 left-0 top-0 animate-slide-in z-20">
            <AiFillCloseCircle
              fontSize={30}
              className="absolute top-2 right-2"
              onClick={() => setToggleSidebar(false)}
            />
            <Sidebar
              user={user && user}
              handleCloseSidebar={setToggleSidebar}
            />
          </div>
        )}
      </div>

      {/* Main App */}
      <div className="w-full h-full">
        <Routes>
          <Route path="/user/:userId" element={<UserProfile user={user} />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;