import React from "react";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  if (!user) return null;
  return (
    <div className="my-3 md:my-5 flex flex-row gap-2 items-center">
      <div className="flex items-center bg-white rounded-md shadow-sm px-2 focus-within:shadow w-full">
        <IoMdSearch fontSize={21} />
        <input
          type="text"
          placeholder="Search"
          className="p-2 outline-none w-full"
          onFocus={() => navigate("/search")}
        />
      </div>
      <Link to={`/user/${user?._id}`} className="hidden md:block">
        <img src={user?.image} className="w-10 rounded-sm" />
      </Link>
      <Link to="/create">
        <IoMdAdd
          fontSize={36}
          className="bg-slate-400 text-white h-100 p-1 rounded-sm"
        />
      </Link>
    </div>
  );
};

export default Navbar;
