"use client";

import { useState, useEffect } from "react";
import RoomList from "@/features/room/RoomList";
import { Room } from "@/types";
import { IoAdd } from "react-icons/io5";
import MenuLayout from "@/component/MenuLayout";
import CreateRoomModal from "@/component/CreateRoomModal";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

interface RoomPageClientProps {
  initialRooms: Room[];
  requiresAuth?: boolean;
}

export default function RoomPageClient({ initialRooms, requiresAuth = false }: RoomPageClientProps) {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const supabase = createSupabaseBrowserClient();

  // 認証が必要な場合のリダイレクト処理
  useEffect(() => {
    if (requiresAuth) {
      console.log("Client: Authentication required, redirecting to login");
      window.location.href = "/login";
    }
  }, [requiresAuth]);

  const handleCreateRoom = async (roomData: {
    name: string;
    description: string;
  }) => {
    try {
      // ユーザー情報を直接取得（セッションの有効性も含めてチェック）
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("User authentication error:", userError);
        // 認証エラーの場合、ログインページにリダイレクト
        window.location.href = "/login";
        return;
      }

      if (!user) {
        console.error("No authenticated user found");
        // ユーザーが見つからない場合、ログインページにリダイレクト
        window.location.href = "/login";
        return;
      }

      // ルームを作成
      const { data: newRoom, error: roomError } = await supabase
        .from("room")
        .insert({
          title: roomData.name,
          created_by: user.id,
        })
        .select()
        .single();

      if (roomError) {
        console.error("Room creation error:", roomError);
        throw new Error("ルームの作成に失敗しました。");
      }

      // ルームユーザーテーブルに追加（作成者として）
      const { error: roomUserError } = await supabase.from("roomUser").insert({
        room_id: newRoom.id,
        user_id: user.id,
      });

      if (roomUserError) {
        console.error("Room user creation error:", roomUserError);
        throw new Error("ルームユーザーの追加に失敗しました。");
      }

      // ローカル状態を更新
      setRooms((prevRooms) => [newRoom, ...prevRooms]);
    } catch (error) {
      console.error("Error creating room:", error);
      throw error;
    }
  };

  return (
    <MenuLayout>
      <div className="min-h-screen font-Noto Serif">
        {/* ヘッダー */}
        <header className="fixed top-0 left-0 w-full h-16 bg-[#7B5858] text-white px-4 py-3 flex items-center justify-between shadow z-0"></header>
        <div className="max-w-2xl mx-auto pt-16">
          <RoomList rooms={rooms} />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 bg-[#7B5858] text-white rounded-full p-4 shadow-lg hover:bg-[#5E4545]"
          aria-label="Add Room"
        >
          <IoAdd className="text-3xl" aria-hidden="true" />
        </button>

        {/* モーダル */}
        <CreateRoomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateRoom}
        />
      </div>
    </MenuLayout>
  );
}
