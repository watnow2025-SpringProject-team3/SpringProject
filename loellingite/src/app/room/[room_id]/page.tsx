import React from "react";

const RoomHome = () => {
  return (
    <div className="min-h-screen h-screen flex flex-col bg-[#f7f5f3]">
      {/* ヘッダー */}
      <header className="bg-[#7B5858] text-white px-0 pt-4 pb-3 flex items-center justify-between border-b border-white relative flex-shrink-0">
        <span className="text-[20px] ml-12">ルーム名</span>
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-8">
          {/* メニューアイコン（三本線） */}
          <svg width="24" height="24" viewBox="0 0 24 24">
            <rect y="5" width="24" height="2.4" rx="1.2" fill="#7B5858" />
            <rect y="11" width="24" height="2.4" rx="1.2" fill="#7B5858" />
            <rect y="17" width="24" height="2.4" rx="1.2" fill="#7B5858" />
          </svg>
        </div>
      </header>

      {/* ルーム一覧 */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center py-6">
        <div className="grid grid-cols-2 gap-5 w-[90%] max-w-[420px] mx-auto">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-[#E0D9D9] border border-[#7B5858] rounded-2xl min-h-[160px] min-w-[140px] aspect-square flex items-center justify-center">
              {/* カード内は空 */}
            </div>
          ))}
        </div>
      </main>

      {/* 下のボタン */}
      <footer className="bg-[#7B5858] px-0 pt-8 pb-6 flex justify-center items-center gap-12 flex-shrink-0 min-w-0 overflow-x-hidden">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-16 md:w-[72px] aspect-square bg-[#FCFBFB] rounded-full flex items-center justify-center shrink-0">
            {/* ボタン内は空 */}
          </div>
        ))}
      </footer>
    </div>
  );
};

export default RoomHome;