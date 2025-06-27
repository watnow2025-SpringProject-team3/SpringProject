"use client";

import React from "react";

const RelayList = ({ roomId }: { roomId: string }) => {
  return (
    <main className="pt-16 pb-28 px-4 overflow-y-auto">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="mb-4 flex items-center border border-[#7B5858] rounded-lg p-6 min-h-[120px] bg-white cursor-pointer"
          onClick={() => window.location.href = `/rooms/${roomId}/${index}`}
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
  );
};

export default RelayList;
