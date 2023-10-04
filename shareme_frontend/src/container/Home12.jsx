import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";

import Pins from "./Pins";
import { Sidebar, UserProfile } from "../components";
import { fetchUserQuery } from "../utils/data";
import client from "../client";
import logo from "../assets/logo.png";

const Home = () => {
  const [user, setUser] = useState(null);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const userInfo = !!localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : localStorage.clear();

  useEffect(() => {
    const query = fetchUserQuery(userInfo?.jti);
    client
      .fetch(query)
      .then((data) => setUser(data[0]))
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col bg-gray-50 md:flex-row h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={35}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-40" />
          </Link>
          <Link to={`user/${user?._id}`}>
            <img src={user?.image} alt="logo" className="w-12 rounded-md" />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={35}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll">
        <Routes>
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
