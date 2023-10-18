import React from "react";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <div className="flex gap-2 w-full mt-5 pb-7">
      <div className="flex flex-row justify-start items-center bg-white shadow-sm rounded-md border-none outline-none focus-within:shadow w-full">
        <IoMdSearch fontSize={21} className="ml-1 bg-white" />
        <input
          type="text"
          placeholder="Search"
          className="p-2 bg-white outline-none w-full"
        />
      </div>
      <Link to={`/user/${user?._id}`}>
        <img
          src={user?.image}
          alt="user"
          className="w-10 rounded-md hidden md:block"
        />
      </Link>
      <Link to="/create">
        <IoMdAdd fontSize={38} className="bg-black text-white rounded-md" />
      </Link>
    </div>
  );
};

export default Navbar;
