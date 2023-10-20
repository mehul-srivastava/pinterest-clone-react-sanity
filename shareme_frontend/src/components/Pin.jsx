import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

import client from "../client";
import { urlFor } from "../client";
import { fetchUser } from "../utils/fetchUser";

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const [savedPosts, setSavedPosts] = useState(save ? save : []);
  const navigate = useNavigate();
  const user = fetchUser();

  const alreadySaved = !!savedPosts?.filter(
    (item) =>
      item.postedBy._ref === user?.jti || item.postedBy._id === user?.jti
  )?.length;

  const handleSavePin = (e) => {
    if (alreadySaved) return;

    e.stopPropagation();
    setSavingPost(true);

    const newSave = {
      _key: uuidv4(),
      userId: user?.jti,
      postedBy: {
        _type: "postedBy",
        _ref: user?.jti,
      },
    };

    client
      .patch(_id)
      .setIfMissing({ save: [] })
      .insert("after", "save[-1]", [newSave])
      .commit()
      .then(() => {
        setSavingPost(false);
        setSavedPosts([...savedPosts, newSave]);
      });
  };

  return (
    <div className="w-max m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          className="rounded-lg w-full"
          alt="pin"
          src={urlFor(image).width(250).url()}
        />
        {postHovered && (
          <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none ml-2"
                >
                  <MdDownloadForOffline />
                </a>
              </div>

              {alreadySaved ? (
                <button
                  type="button"
                  disabled={true}
                  className="bg-red-500 opacity-70 text-white px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  Saved ({savedPosts?.length})
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSavePin}
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {savingPost ? "Saving..." : "Save"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pin;
