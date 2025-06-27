import React from "react";
import { MdHome, MdAddAPhoto, MdArrowBack, MdEdit } from "react-icons/md";
import RelayCard from "@/features/relay/RelayCard";

// ダミーデータ
const relays = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: "リレー名",
  topic: "投稿のお題がここに表示されます。"
}));

export default function RelayListPage() {
  return (
    <div className="min-h-screen bg-[#F7F3F1] flex flex-col">
      {/* ヘッダー */}
      <header className="bg-[#7B5858] text-white h-14 flex items-center justify-between px-4 sticky top-0 z-10">
        <button className="p-2"><MdArrowBack size={28} /></button>
        <span className="text-lg font-medium">ルーム名</span>
        <button className="p-2"><MdEdit size={24} /></button>
      </header>

      {/* リスト */}
      <div className="flex-1 overflow-y-auto px-4 pt-8 pb-32 max-w-2xl mx-auto w-full">
        {relays.map((relay) => (
          <RelayCard key={relay.id} relays={relays} />
        ))}
      </div>

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
}