import React, { useEffect, useLayoutEffect, useState } from "react";
import client from "../client";
import MasonryLayout from "./MasonryLayout";
import { googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { userCreatedPinsQuery, userSavedPinsQuery } from "../utils/data";

const tabActiveStyles = `cursor-pointer inline-block px-7 py-3 text-white bg-red-500 rounded-lg font-bold`;
const tabNotActiveStyles = `cursor-pointer inline-block px-7 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white`;

const UserProfile = ({ user }) => {
  const [savedPinsTab, setSavedPinsTab] = useState(true);
  const [pins, setPins] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams();

  const logoutUser = () => {
    googleLogout();
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    setPins(null);
    if (savedPinsTab) {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [savedPinsTab, userId]);

  useLayoutEffect(() => {
    const width = document.querySelector("#banner .w-full").clientWidth;
    document
      .querySelector("#banner-img")
      .setAttribute(
        "src",
        `https://placehold.co/${width}x200?text=%23+USER+BANNER`
      );
  });

  return (
    <div id="banner">
      <div className="w-full relative">
        <img
          src={""}
          alt="banner"
          id="banner-img"
          className="max-h-[200px] w-full"
        />
        <img
          src={user?.image}
          alt="user"
          className="h-16 w-16 md:w-24 md:h-24 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-2 border-black z-10"
        />
        {userId != user?.jit && (
          <button
            type="button"
            className="absolute top-4 right-8 bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
            onClick={logoutUser}
          >
            <AiOutlineLogout color="red" fontSize={21} />
          </button>
        )}
      </div>
      <h1 className="text-center mt-20 text-4xl font-semibold">
        {user?.userName}
      </h1>

      <div className="flex justify-center flex-col items-center mt-12">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="mr-2">
            <a
              className={savedPinsTab ? tabActiveStyles : tabNotActiveStyles}
              onClick={() => !savedPinsTab && setSavedPinsTab(true)}
            >
              Saved Pins
            </a>
          </li>
          <li className="mr-2">
            <a
              className={savedPinsTab ? tabNotActiveStyles : tabActiveStyles}
              onClick={() => savedPinsTab && setSavedPinsTab(false)}
            >
              Your Creations
            </a>
          </li>
        </ul>

        <div className="px-2 mt-5">
          {pins?.length === 0 ? (
            <h2 className="text-center text-2xl mt-10 font-semibold">
              No Pins Found!
            </h2>
          ) : (
            <MasonryLayout pins={pins} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
