// ルーム/リレー一覧
"use client";

import React from "react";
import MenuButton from "@/component/MenuButton";
import BackButton from "@/component/BackButton";
import RelayList from "@/features/relay/RelayList";
import { useState } from "react";
import SideMenu from "@/component/SideMenu";

const RoomHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen h-screen">
      {/* ヘッダー */}
      <header className="fixed top-0 left-0 w-full bg-[#7B5858] text-white px-4 py-3 flex items-center justify-between shadow z-50">
        <BackButton />

        <span className="text-[20px] mx-auto">ルーム名</span>
        
        <MenuButton onClick={handleMenuOpen} />
      </header>

      {/* リレー一覧 */}
      <main className="flex-1 px-4 py-2">
        <p className="text-gray-600">ここにリレーの一覧が表示されます。</p>
        <RelayList roomId="roomId" />
      </main>

      {/* サイドメニュー */}
      <SideMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
    </div>
  );
};

export default RoomHome;
