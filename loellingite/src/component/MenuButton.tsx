import React from "react";
import { IoMenu as MenuIcon } from "react-icons/io5";

interface MenuButtonProps {
  onClick?: () => void;
}

const MenuButton = ({ onClick }: MenuButtonProps) => {
  return (
    <button
      className="p-2 rounded hover:bg-[#6a4747] focus:outline-none"
      onClick={onClick}
    >
      <span className="sr-only">メニューを開く</span>
      <MenuIcon className="text-white" size={28} />
    </button>
  );
};

export default MenuButton;
