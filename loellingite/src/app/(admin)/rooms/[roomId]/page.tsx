// ルームホーム画面

"use client";

import RelaysGridWithText from "@/features/relay/RelaysGridWithText";
import { IoArrowBack } from "react-icons/io5";

// ダミーデータ
const cards = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
}));

export default function RoomHomePage() {
  return (
    <div className="min-h-screen h-screen flex flex-col bg-primaryBackground">
      {/* ヘッダー */}
      <header className="bg-header px-0 pt-4 pb-3 flex items-center justify-between border-b border-primaryBorder relative flex-shrink-0 text-primaryText">
        <button
          onClick={() => window.history.back()}
          className="hover:text-primaryHover transition-colors p-2 ml-2"
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
        <RelaysGridWithText relays={cards} />
      </main>
    </div>
  );
}
