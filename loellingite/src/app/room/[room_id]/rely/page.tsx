// ここにリレーの一覧画面を作成する
import React from "react";

const RoomHome = () => {
  return (
    <div className="min-h-screen h-screen">
      {/* ヘッダー */}
      <header className="fixed top-0 left-0 w-full bg-[#7B5858] text-white px-4 py-3 flex items-center justify-between shadow z-50">
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

      {/* 下のボタン */}
    {/* 固定フッター */}
    <footer className="fixed bottom-0 left-0 w-full bg-[#7B5858] px-0 pt-8 pb-6 flex justify-center items-center gap-12 z-50">
    {[...Array(3)].map((_, i) => (
    <div
      key={i}
      className="w-16 aspect-square bg-[#FCFBFB] rounded-full flex items-center justify-center"
    >
      {/* 任意のアイコンや内容 */}
    </div>
  ))}
</footer>

    </div>
  );
};

export default RoomHome;