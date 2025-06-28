"use client";

import React from "react";
import { IoArrowBack as BackIcon } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  href?: string;
}

const BackButton = ({ href }: BackButtonProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button 
      onClick={handleBack}
      className="p-2 rounded hover:bg-[#6a4747] focus:outline-none"
    >
      <span className="sr-only">戻る</span>
      <BackIcon className="h-6 w-6 text-white" />
    </button>
  );
};

export default BackButton;
