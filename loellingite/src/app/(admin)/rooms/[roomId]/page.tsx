// ルーム/リレー一覧
import React from "react";
import { FaBars as MenuIcon } from "react-icons/fa";

const RoomHome = () => {
  return (
    <div className="min-h-screen h-screen">
      {/* ヘッダー */}
      <header className="fixed top-0 left-0 w-full bg-[#7B5858] text-white px-4 py-3 flex items-center justify-between shadow z-50">
        <button className="p-2 rounded hover:bg-[#6a4747] focus:outline-none">
          <span className="sr-only">戻る</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"    >

            </svg>
          <path
        <span className="text-[20px] ml-12">ルーム名</span>
        <button className="p-2 rounded hover:bg-[#6a4747] focus:outline-none">
          <span className="sr-only">メニューを開く</span>
          <MenuIcon className="text-white" size={28} />
        </button>
      </header>

      {/* リレー一覧 */}
      <main className="flex-1 px-4 py-2">
        <p className="text-gray-600">ここにリレーの一覧が表示されます。</p>

        {/* リレーの一覧を表示するコンポーネントをここに追加 */}
        <main className="pt-16 pb-28 px-4 overflow-y-auto">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="mb-4 flex items-center border border-[#7B5858] rounded-lg p-6 min-h-[120px] bg-white"
            >
              {/* 左の画像 */}
              <div className="w-24 h-24 bg-[#E0D9D9] rounded-md flex-shrink-0" />

              {/* 右の情報 */}
              <div className="ml-4 flex flex-col">
                <div className="w-12 h-12 bg-[#E0D9D9] rounded-full mb-1" />
                <p className="text-[#7B5858] font-semibold text-sm">リレー名</p>
                <p className="text-xs text-gray-600">
                  投稿のお題がここに表示されます。
                </p>
              </div>
            </div>
          ))}
        </main>
      </main>
    </div>
  );
};

export default RoomHome;
