// ルーム/リレー一覧
import React from "react";
import { getServerUser } from "@/lib/supabase/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Room } from "@/types";
import RoomDetailClient from "@/app/(admin)/rooms/[roomId]/RoomDetailClient";

interface RoomDetailPageProps {
  params: Promise<{
    roomId: string;
  }>;
}

async function fetchRoom(roomId: string): Promise<Room | null> {
  try {
    // 認証チェック
    const { user, error: authError } = await getServerUser();

    if (authError || !user) {
      console.error("Authentication error:", authError);
      return null;
    }

    const supabase = await createSupabaseServerClient();

    // ルーム情報を取得
    const { data: room, error } = await supabase
      .from("room")
      .select("*")
      .eq("id", parseInt(roomId))
      .single();

    if (error) {
      console.error("Error fetching room:", error);
      return null;
    }

    // ユーザーがこのルームにアクセス権があるかチェック
    const { data: roomUser, error: roomUserError } = await supabase
      .from("roomUser")
      .select("*")
      .eq("room_id", parseInt(roomId))
      .eq("user_id", user.id)
      .single();

    if (roomUserError || !roomUser) {
      console.error("User does not have access to this room");
      return null;
    }

    return room;
  } catch (error) {
    console.error("Unexpected error in fetchRoom:", error);
    return null;
  }
}

export default async function RoomDetailPage({ params }: RoomDetailPageProps) {
  const { roomId } = await params;
  const room = await fetchRoom(roomId);

  if (!room) {
    // ルームが見つからない場合やアクセス権がない場合
    return <RoomDetailClient room={null} roomId={roomId} />;
  }

  return <RoomDetailClient room={room} roomId={roomId} />;
}
