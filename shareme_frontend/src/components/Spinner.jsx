import React from "react";
import { Circles } from "react-loader-spinner";

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full mt-9">
      <Circles color="#EF4444" height={50} width={200} />
      <p className="text-lg text-center px-2 mt-2">{message}</p>
    </div>
  );
};

export default Spinner;
