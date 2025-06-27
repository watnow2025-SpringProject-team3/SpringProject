"use client";

import React, { useState, useEffect } from "react";
import MenuButton from "@/component/MenuButton";
import BackButton from "@/component/BackButton";
import RelayList from "@/features/relay/RelayList";
import SideMenu from "@/component/SideMenu";
import CreateRelayModal from "@/component/CreateRelayModal";
import { Room } from "@/types";
import { IoAdd } from "react-icons/io5";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

interface RoomDetailClientProps {
  room: Room | null;
  roomId: string;
}

export default function RoomDetailClient({ room, roomId }: RoomDetailClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRelayModalOpen, setIsRelayModalOpen] = useState(false);
  const [relayListKey, setRelayListKey] = useState(0);
  const supabase = createSupabaseBrowserClient();

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleCreateRelay = async (relayData: { name: string; description: string; theme: string }) => {
    try {
      // 認証チェック
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User authentication error:", userError);
        throw new Error("認証に失敗しました。ログインし直してください。");
      }

      // リレーを作成
      const { data: newRelay, error: relayError } = await supabase
        .from("relay")
        .insert({
          title: relayData.name,
          theme: relayData.theme,
          room_id: parseInt(roomId),
          created_by: user.id,
        })
        .select()
        .single();

      if (relayError) {
        console.error("Relay creation error:", relayError);
        throw new Error("リレーの作成に失敗しました。");
      }

      console.log("Relay created successfully:", newRelay);
      
      // RelayListを強制的に再レンダリングして新しいリレーを表示
      setRelayListKey(prev => prev + 1);
      
    } catch (error) {
      console.error("Error creating relay:", error);
      throw error;
    }
  };

  // ルームが見つからないかアクセス権がない場合のリダイレクト
  useEffect(() => {
    if (!room) {
      console.log("Room not found or access denied, redirecting to rooms");
      window.location.href = "/rooms";
    }
  }, [room]);

  // リダイレクト中の表示
  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">ルームが見つからないか、アクセス権がありません。</p>
          <p className="text-gray-600">リダイレクト中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen">
      {/* ヘッダー */}
      <header className="fixed top-0 left-0 w-full bg-[#7B5858] text-white px-4 py-3 flex items-center justify-between shadow z-50">
        <BackButton href="/rooms" />

        <span className="text-[20px] mx-auto">{room.title}</span>
        
        <MenuButton onClick={handleMenuOpen} />
      </header>

      {/* リレー一覧 */}
      <main className="flex-1 px-4 py-2">
        <p className="text-gray-600">ここにリレーの一覧が表示されます。</p>
        <RelayList key={relayListKey} roomId={roomId} />
      </main>

      {/* リレー追加ボタン */}
      <button
        onClick={() => setIsRelayModalOpen(true)}
        className="fixed bottom-6 right-6 bg-[#7B5858] text-white rounded-full p-4 shadow-lg hover:bg-[#5E4545]"
        aria-label="Add Relay"
      >
        <IoAdd className="text-3xl" aria-hidden="true" />
      </button>

      {/* リレー作成モーダル */}
      <CreateRelayModal
        isOpen={isRelayModalOpen}
        onClose={() => setIsRelayModalOpen(false)}
        onSubmit={handleCreateRelay}
      />

      {/* サイドメニュー */}
      <SideMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
    </div>
  );
}
