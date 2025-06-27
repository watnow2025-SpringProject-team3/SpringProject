import React from "react";
import { IoArrowBack as BackIcon } from "react-icons/io5";

const BackButton = () => {
  return (
    <button className="p-2 rounded hover:bg-[#6a4747] focus:outline-none">
      <span className="sr-only">戻る</span>
      <BackIcon className="h-6 w-6 text-white" />
    </button>
  );
};

export default BackButton;
