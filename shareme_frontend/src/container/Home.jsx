import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";

import { Sidebar, UserProfile } from "../components";
import Pins from "./Pins";
import logo from "../assets/logo.png";
import client from "../client";
import { fetchUserQuery } from "../utils/data";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);

  const userInfo = !!localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : localStorage.clear();

  useEffect(() => {
    setUser({
      _id: userInfo.jti,
      image: userInfo.picture,
      userName: userInfo.name,
    });

    /* Production purpose
    const query = fetchUserQuery(userInfo.jti);
    client.fetch(query).then((data) => setUser(data[0]));
    */
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 h-screen">
      {/* Desktop Navbar */}
      <div className="hidden md:flex flex-col">
        <Sidebar user={user && user} handleCloseSidebar={setToggleSidebar} />
      </div>

      {/* Mobile Navbar */}
      <div className="w-full shadow-sm md:hidden bg-white flex flex-row justify-between items-center p-3">
        <HiMenu fontSize={30} onClick={() => setToggleSidebar(true)} />
        <img src={logo} alt="logo" className="w-40" />
        <img src={user?.image} alt="user" className="w-10 rounded-md" />
        {toggleSidebar && (
          <div className="fixed border h-screen w-4/5 left-0 top-0 animate-slide-in">
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
      <div>
        <Routes>
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
