"use client";

import React, { useEffect } from "react";
import { MdArrowBack, MdAccountCircle, MdAdd } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Relay } from "@/types/relay";

interface Post {
  id: number;
  created_at: string;
  created_by: string;
  image: string;
  relay_id: number;
  subtitle: string | null;
}

interface RelayDetailClientProps {
  relay: Relay | null;
  posts: Post[];
  roomId: string;
  relayId: string;
}

export default function RelayDetailClient({ 
  relay, 
  posts, 
  roomId, 
  relayId 
}: RelayDetailClientProps) {
  const router = useRouter();

  // リレーが見つからないかアクセス権がない場合のリダイレクト
  useEffect(() => {
    if (!relay) {
      console.log("Relay not found or access denied, redirecting to room");
      window.location.href = `/rooms/${roomId}`;
    }
  }, [relay, roomId]);

  const handleBack = () => {
    router.push(`/rooms/${roomId}`);
  };

  // リダイレクト中の表示
  if (!relay) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">リレーが見つからないか、アクセス権がありません。</p>
          <p className="text-gray-600">リダイレクト中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ヘッダー */}
      <header className="bg-[#7B5858] text-white h-14 flex items-center justify-between px-4 sticky top-0 z-10">
        <button className="p-2" title="戻る" onClick={handleBack}>
          <MdArrowBack size={28} />
        </button>
        <span className="text-lg font-medium">
          {relay.title || relay.name || "無題のリレー"}
        </span>
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
              投稿のテーマ
            </h2>
            {relay.theme && (
              <p className="text-center text-gray-600 mt-2 text-sm">
                {relay.theme}
              </p>
            )}
            {relay.description && (
              <p className="text-center text-gray-600 mt-2 text-sm">
                {relay.description}
              </p>
            )}
          </div>
        </div>

        {/* 投稿一覧 */}
        <div className="space-y-4 max-w-md mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">まだ投稿がありません</p>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-300 rounded-2xl p-4 min-h-[120px] relative"
              >
                {/* 投稿画像エリア */}
                <div className="mb-4">
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt="投稿画像" 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                </div>

                {/* ユーザー情報 */}
                <div className="flex items-center gap-3 absolute bottom-4 left-4">
                  <div className="w-8 h-8 bg-white rounded-full border border-gray-400"></div>
                  <span className="text-gray-700 text-sm">
                    {post.subtitle || "投稿"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* フローティング追加ボタン */}
      <Link
        href={`/rooms/${roomId}/${relayId}/create-post`}
        className="fixed bottom-6 right-1/2 transform translate-x-1/2 bg-[#7B5858] text-white rounded-full p-4 shadow-lg hover:bg-[#6A4A4A] transition-colors z-20"
      >
        <MdAdd size={32} />
      </Link>
    </div>
  );
}
