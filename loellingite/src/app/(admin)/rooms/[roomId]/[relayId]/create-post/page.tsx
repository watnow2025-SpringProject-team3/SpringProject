import React from "react";
import { getServerUser } from "@/lib/supabase/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Relay } from "@/types/relay";
import CreatePostClient from "./CreatePostClient";

interface CreatePostPageProps {
  params: Promise<{
    roomId: string;
    relayId: string;
  }>;
}

async function fetchRelayInfo(roomId: string, relayId: string): Promise<Relay | null> {
  try {
    // 認証チェック
    const { user, error: authError } = await getServerUser();

    if (authError || !user) {
      console.error("Authentication error:", authError);
      return null;
    }

    const supabase = await createSupabaseServerClient();

    // リレー情報を取得
    const { data: relay, error: relayError } = await supabase
      .from("relay")
      .select("*")
      .eq("id", parseInt(relayId))
      .eq("room_id", parseInt(roomId))
      .single();

    if (relayError || !relay) {
      console.error("Error fetching relay:", relayError);
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

    return relay;
  } catch (error) {
    console.error("Unexpected error in fetchRelayInfo:", error);
    return null;
  }
}

export default async function CreatePostPage({ params }: CreatePostPageProps) {
  const { roomId, relayId } = await params;
  const relay = await fetchRelayInfo(roomId, relayId);

  if (!relay) {
    // リレーが見つからない場合やアクセス権がない場合
    return (
      <CreatePostClient 
        relay={null} 
        roomId={roomId} 
        relayId={relayId} 
      />
    );
  }

  return (
    <CreatePostClient 
      relay={relay} 
      roomId={roomId} 
      relayId={relayId} 
    />
  );
}
