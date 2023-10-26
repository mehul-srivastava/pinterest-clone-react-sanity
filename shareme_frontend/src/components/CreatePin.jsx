import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import client from "../client";
import { fetchUser } from "../utils/fetchUser";
import { categories } from "../utils/data";
import Spinner from "./Spinner";
import { ColorRing } from "react-loader-spinner";

const CreatePin = () => {
  const [errorMessage, setErrorMessage] = useState({});
  const [formFields, setFormFields] = useState({});
  const [imageLoading, setImageLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const navigate = useNavigate();
  const user = fetchUser();

  const handleImage = (e) => {
    const { type } = e.target.files[0];
    let allowedTypes = ["png", "gif", "tiff", "jpg", "jpeg"];
    setImageLoading(true);

    if (!allowedTypes.includes(type.split("/")[1])) {
      setErrorMessage({ ...errorMessage, file: "File type not supported!" });
      setImageLoading(false);
    } else {
      uploadImageToSanityServer(e.target.files[0]);
    }
  };

  const handleSavePin = (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    const { title, about, destination, category } = formFields;

    if (!title || !about || !category || !destination) {
      setErrorMessage({
        fields: "Please fill all the details!",
      });
      setSubmitLoading(false);
      return;
    }

    if (!imageAsset) {
      setErrorMessage({ file: "Please upload an image!" });
      setSubmitLoading(false);
      return;
    }

    setSubmitLoading(true);
    const doc = {
      _type: "pin",
      title,
      about,
      destination,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset?._id,
        },
      },
      userId: user?.jti,
      postedBy: {
        _type: "reference",
        _ref: user?.jti,
      },
      category,
    };

    client.create(doc).then((res) => {
      setSubmitLoading(false);
      navigate("/");
    });
  };

  const handleInput = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const deleteImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setImageAsset(null);
    setErrorMessage({ ...errorMessage, file: "" });

    client.delete(imageAsset._id).catch((error) => {
      alert("An error occurred while deleting your image...");
      window.location.reload();
    });
  };

  const uploadImageToSanityServer = (file) => {
    client.assets
      .upload("image", file, {
        contentType: file.type,
        filename: file.name,
      })
      .then((imageAsset) => {
        setImageLoading(false);
        setImageAsset(imageAsset);
      });
  };

  return (
    <div className="bg-white flex flex-col md:flex-row p-4 rounded-sm relative">
      {submitLoading && (
        <div className="absolute z-20 top-0 bottom-0 left-0 right-0 opacity-90 bg-white flex flex-col justify-center items-center">
          <ColorRing
            visible={true}
            height="100"
            width="100"
            ariaLabel="blocks-loading"
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
          <strong className="text-2xl">Creating Your Pin....</strong>
        </div>
      )}
      {/* Pin Image Field */}
      <div className="bg-secondaryColor w-full p-4 rounded-sm">
        <label className="h-420 block cursor-pointer">
          <div className="w-full h-420 flex flex-col items-center justify-center border-2 border-gray-300 border-dotted">
            {imageAsset?.url ? (
              /* Show uploaded image */
              <div className="relative h-420 flex justify-center p-2">
                <img
                  src={imageAsset.url}
                  // src="https://cdn.sanity.io/images/dndkt71m/production/6d1e40d403cce302742675ebebccdced176569d8-811x788.png"
                  alt="pin"
                  className="h-full rounded-md"
                />
                <p className="absolute top-4 right-4 bg-white opacity-90 cursor-pointer p-2 rounded-sm text-xs">
                  {imageAsset?.metadata?.dimensions.height} x{" "}
                  {imageAsset?.metadata?.dimensions.width}
                </p>
                <div
                  className="bg-white absolute bottom-4 right-4 p-2 rounded-sm"
                  onClick={deleteImage}
                >
                  <MdDelete fontSize={31} />
                </div>
              </div>
            ) : /* Show upload image field */
            imageLoading ? (
              <Spinner message="Please wait while we upload your image to the server..." />
            ) : (
              <>
                <p className="mb-10 text-red-500">
                  {errorMessage?.file && errorMessage.file}
                </p>
                <AiOutlineCloudUpload fontSize={51} />
                <p className="text-md md:text-lg">Click To Upload</p>
                <p className="mt-24 text-gray-400 text-sm md:text-md">
                  Use high quality JPEG, SVG, PNG, GIF less than 20 MB
                </p>
                <input
                  type="file"
                  name="upload"
                  onChange={handleImage}
                  className="w-0 h-0 hidden"
                />
              </>
            )}
          </div>
        </label>
      </div>
      {/* Form Fields */}
      <form
        onSubmit={handleSavePin}
        className="w-full flex flex-col justify-center"
      >
        <h4 className="text-4xl md:mx-4 mt-5 md:mt-0 mb-4 font-semibold">
          Elaborate Your Pin!
        </h4>
        <input
          type="text"
          onChange={handleInput}
          name="title"
          placeholder="Add your title here"
          className="border border-gray-200 md:mx-4 rounded-md mb-4 p-2 outline-none"
        />

        <input
          type="text"
          onChange={handleInput}
          name="about"
          placeholder="Add your description here"
          className="border border-gray-200 md:mx-4 rounded-md mb-4 p-2 outline-none"
        />

        <input
          type="url"
          onChange={handleInput}
          name="destination"
          placeholder="Add your destination URL here"
          className="border border-gray-200 md:mx-4 rounded-md mb-4 p-2 outline-none"
        />

        <select
          type="text"
          onChange={handleInput}
          name="category"
          placeholder="Add your destination URL here"
          defaultValue="default"
          className="border border-gray-200 md:mx-4 rounded-md mb-4 p-2 outline-none"
        >
          <option disabled value="default">
            --- Choose Pin Cateogry ---
          </option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-red-500 text-white font-bold md:mx-4 p-2 mb-5 rounded-full w-28 outline-none mt-2"
        >
          Save Pin
        </button>
        <p className="text-red-500 md:mx-4">
          {errorMessage?.fields ? errorMessage.fields : "‎"}
        </p>
      </form>
    </div>
  );
};

export default CreatePin;
