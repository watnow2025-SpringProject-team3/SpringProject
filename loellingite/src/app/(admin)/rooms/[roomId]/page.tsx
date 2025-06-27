// ルームホーム画面

"use client";

import RoomDetailGrid from "@/features/relay/RelaysGridWithText";
import { IoArrowBack } from "react-icons/io5";

// ダミーデータ
const cards = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
}));

export default function RoomHomePage() {
  return (
    <div className="min-h-screen h-screen flex flex-col bg-[#f7f5f3]">
      {/* ヘッダー */}
      <header className="bg-[#7B5858] text-white px-0 pt-4 pb-3 flex items-center justify-between border-b border-white relative flex-shrink-0">
        <button
          onClick={() => window.history.back()}
          className="text-white hover:text-gray-200 transition-colors p-2 ml-2"
          aria-label="戻る"
        >
          <IoArrowBack className="w-6 h-6" />
        </button>
        <span className="text-[20px] absolute left-1/2 transform -translate-x-1/2">
          ルーム名
        </span>
      </header>

      {/* ルーム詳細グリッド */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center py-6">
        <RoomDetailGrid cards={cards} />
      </main>
    </div>
  );
}
