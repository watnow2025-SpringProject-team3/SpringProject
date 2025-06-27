import React from "react";
import RoomDetailGrid from "@/components/feat/RoomDetailGrid";
import { MdArrowBack, MdEdit, MdHome, MdAddAPhoto } from "react-icons/md";

// ダミーデータ
const cards = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
}));

export default function RoomHome() {

  return (
    <div className="min-h-screen h-screen flex flex-col bg-[#f7f5f3] relative">
      {/* ヘッダー */}
      <header className="bg-[#7B5858] text-white h-14 flex items-center justify-between px-4 sticky top-0 z-10">
        <button className="p-2"><MdArrowBack size={28} /></button>
        <span className="text-lg font-medium">ルーム名</span>
        <button className="p-2"><MdEdit size={24} /></button>
      </header>

      {/* ルーム詳細グリッド */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center py-6">
        <RoomDetailGrid cards={cards} />
      </main>

      {/* フッター */}
      <footer className="bg-[#7B5858] text-white h-16 flex justify-around items-center fixed bottom-0 left-0 w-full z-20">
        <div className="flex flex-col items-center">
          <MdHome size={28} />
          <span className="text-xs mt-1">ホーム</span>
        </div>
        <div className="flex flex-col items-center">
          <MdAddAPhoto size={28} />
          <span className="text-xs mt-1">追加</span>
        </div>
      </footer>
    </div>
  );
};