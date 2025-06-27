"use client";

import React, { useState } from "react";
import MenuButton from "@/component/MenuButton";
import SideMenu from "@/component/SideMenu";

interface MenuLayoutProps {
  children: React.ReactNode;
}

const MenuLayout = ({ children }: MenuLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {children}
      <div className="fixed top-0 right-0 p-4 z-30">
        <MenuButton onClick={handleMenuOpen} />
      </div>
      <SideMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
    </>
  );
};

export default MenuLayout;
