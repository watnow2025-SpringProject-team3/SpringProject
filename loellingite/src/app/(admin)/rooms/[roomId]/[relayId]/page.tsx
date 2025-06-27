import React from "react";
import { MdArrowBack, MdAccountCircle, MdAdd } from "react-icons/md";
import Link from "next/link";

// ダミーデータ
const posts = Array.from({ length: 3 }, (_, i) => ({
  id: i + 1,
  content: "投稿するときのコメント",
  user: {
    id: 1,
    name: "ユーザー名",
    avatar: null,
  },
}));

export default function RelayDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ヘッダー */}
      <header className="bg-[#7B5858] text-white h-14 flex items-center justify-between px-4 sticky top-0 z-10">
        <button className="p-2" title="戻る">
          <MdArrowBack size={28} />
        </button>
        <span className="text-lg font-medium">リレー名</span>
        <button className="p-2" title="プロフィール">
          <MdAccountCircle size={28} />
        </button>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 px-4 pb-24">
        {/* 投稿のルール */}
        <div className="mt-6 mb-6">
          <div className="bg-white border border-gray-300 rounded-2xl p-6 mx-auto max-w-md">
            <h2 className="text-center text-gray-700 text-lg font-medium">
              投稿のルール
            </h2>
          </div>
        </div>

        {/* 投稿一覧 */}
        <div className="space-y-4 max-w-md mx-auto">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-300 rounded-2xl p-4 min-h-[120px] relative"
            >
              {/* 投稿内容エリア */}
              <div className="mb-4"></div>

              {/* ユーザー情報 */}
              <div className="flex items-center gap-3 absolute bottom-4 left-4">
                <div className="w-8 h-8 bg-white rounded-full border border-gray-400"></div>
                <span className="text-gray-700 text-sm">{post.content}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* フローティング追加ボタン */}
      <Link
        href="./create-post"
        className="fixed bottom-6 right-1/2 transform translate-x-1/2 bg-[#7B5858] text-white rounded-full p-4 shadow-lg hover:bg-[#6A4A4A] transition-colors z-20"
      >
        <MdAdd size={32} />
      </Link>
    </div>
  );
}
