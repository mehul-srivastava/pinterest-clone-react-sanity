import React, { useState } from "react";

const tabActiveStyles = `cursor-pointer inline-block px-7 py-3 text-white bg-red-500 rounded-lg font-bold`;
const tabNotActiveStyles = `cursor-pointer inline-block px-7 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white`;

const UserProfile = ({ user }) => {
  const [savedPinsTab, setSavedPinsTab] = useState(true);
  return (
    <div>
      <div className="w-full">
        <img src="/banner.png" alt="banner" className="max-h-[200px] w-full" />
      </div>
      <div className="relative">
        <img
          src={user?.image}
          alt="user"
          className="h-16 w-16 md:w-28 md:h-28 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-2 border-black z-10"
        />
      </div>

      <div className="flex justify-center items-center mt-24">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="mr-2">
            <a
              className={savedPinsTab ? tabActiveStyles : tabNotActiveStyles}
              onClick={() => !savedPinsTab && setSavedPinsTab(true)}
            >
              Saved Pins
            </a>
          </li>
          <li class="mr-2">
            <a
              className={savedPinsTab ? tabNotActiveStyles : tabActiveStyles}
              onClick={() => savedPinsTab && setSavedPinsTab(false)}
            >
              Your Creations
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
