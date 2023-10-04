import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import shareVideo from "../assets/share.mp4";
import logo from "../assets/logo.png";
import client from "../client";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (response) => {
    const userInfo = jwt_decode(response.credential);
    localStorage.setItem("user", JSON.stringify(userInfo));

    const { jti, name, picture } = userInfo;

    const doc = {
      _id: jti,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop={true}
          controls={false}
          muted={false}
          autoPlay={true}
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="logo" width="130px" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={handleLogin}
              onError={() => console.log("Login failed!")}
              theme="filled_black"
              size="large"
              useOneTap={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
