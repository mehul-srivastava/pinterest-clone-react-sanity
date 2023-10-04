import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";

import { Sidebar } from "../components";
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
    setUser({
      _id: userInfo.jti,
      image: userInfo.picture,
      userName: userInfo.name,
    });
  }, []);

  return (
    <div className="flex bg-gray-50">
      <div className="hidden md:flex h-screen">
        <Sidebar user={user} toggleSidebar={setToggleSidebar} />
      </div>
      <div className="flex flex-row justify-between items-center w-full p-2 lg:px-10 md:hidden">
        <HiMenu
          fontSize={35}
          onClick={() => setToggleSidebar(true)}
          className="cursor-pointer md:hidden"
        />
        <img src={logo} alt="logo" className="w-40" />
        <img src={user?.image} alt="user" className="w-12 rounded-lg" />
      </div>
      {toggleSidebar && (
        <div className="flex flex-col fixed w-4/5 bg-white h-screen shadow-lg p-4 transition duration-75 animate-slide-in">
          <AiFillCloseCircle
            fontSize={30}
            onClick={() => setToggleSidebar(false)}
            className="cursor-pointer absolute right-0 top-0 m-2"
          />
          <Sidebar user={user} toggleSidebar={setToggleSidebar} />
        </div>
      )}
    </div>
  );
};

export default Home;
