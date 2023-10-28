import React, { useEffect, useState } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import client, { urlFor } from "../client";
import { pinDetailQuery } from "../utils/data";
import { extractDomainFromUrl } from "../utils/helpers";
import Spinner from "./Spinner";

const PinDetail = ({ user }) => {
  const [pinDetail, setPinDetail] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { pinId } = useParams();

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    client.fetch(query).then((data) => {
      setComments(data[0].comments);
      delete data[0].comments;
      setPinDetail(data[0]);
    });
  };

  const addCommentToPin = () => {
    setIsAddingComment(true);

    if (commentInput.trim().length === 0) {
      setIsAddingComment(false);
      alert("Please fill in the input with appropriate characters!");
      return;
    }

    client
      .patch(pinId)
      .setIfMissing({ comments: [] })
      .append("comments", [
        {
          _key: uuidv4(),
          postedBy: { _key: uuidv4(), _type: "postedBy", _ref: user?._id },
          comment: commentInput,
        },
      ])
      .commit()
      .then(() => {
        setCommentInput("");
        setIsAddingComment(false);
        setComments([
          ...comments,
          {
            comment: commentInput,
            postedBy: { userName: user.userName, image: user.image },
          },
        ]);
      })
      .catch(() => {
        setCommentInput("");
        setIsAddingComment(false);
      });
  };

  const downloadPin = (url) => {
    window.location.href = `${url}?dl=`;
  };

  useEffect(() => {
    fetchPinDetails();
  }, []);

  if (!pinDetail) return <Spinner message="Loading pin..." />;

  return (
    <div>
      <img
        src={pinDetail?.image && urlFor(pinDetail?.image?.asset?._ref)}
        alt="pin"
        className="rounded-t-3xl rounded-b-xl w-full"
      />
      <div className="flex flex-row justify-between w-full mt-2">
        <MdDownloadForOffline
          onClick={() => downloadPin(urlFor(pinDetail?.image?.asset?._ref))}
          className="opacity-75"
          fontSize={25}
        />
        <a
          className="underline decoration-dotted flex flex-row items-center justify-center gap-2 text-md"
          href={pinDetail?.destination}
          target="_blank"
        >
          <BsFillArrowUpRightCircleFill className="opacity-75" fontSize={21} />
          {extractDomainFromUrl(pinDetail?.destination)}
        </a>
      </div>
      <h1 className="text-3xl font-bold mt-7">{pinDetail?.title}</h1>
      <h4 className="text-md text-gray-500 mt-1">{pinDetail?.about}</h4>
      <p className="flex flex-row items-center gap-2 mt-4">
        <img
          src={pinDetail?.postedBy?.image}
          alt="user"
          className="w-6 rounded-sm"
        />
        <span className="text-sm">{pinDetail?.postedBy?.userName}</span>
      </p>

      <div className="mt-14 pb-10">
        <h3 className="text-2xl">Comments</h3>
        <div className="mt-4">
          {comments?.map((user_comment, idx) => (
            <div className="flex flex-row items-center mb-6 gap-3" key={idx}>
              <img
                src={user_comment?.postedBy?.image}
                className="w-10 h-full rounded-sm"
                alt="user"
              />
              <div className="flex flex-col">
                <p className="uppercase text-xs font-bold">
                  {user_comment?.postedBy?.userName}
                </p>
                <p className="text-sm text-gray-600">{user_comment.comment}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-row justify-center items-center gap-4 mt-3">
          <input
            type="text"
            className="border border-gray-300 outline-none rounded-xl p-2 w-full text-sm"
            placeholder="Add A Comment"
            onChange={(e) => setCommentInput(e.target.value)}
            value={commentInput}
          />
          <button
            className={`bg-red-500 text-white font-bold rounded-xl p-2 px-4 outline-none text-sm ${
              isAddingComment && "opacity-75"
            }`}
            onClick={addCommentToPin}
            disabled={isAddingComment}
          >
            {isAddingComment ? "Posting..." : "Comment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinDetail;
