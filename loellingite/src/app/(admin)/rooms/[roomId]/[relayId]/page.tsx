import React from "react";
import { getServerUser } from "@/lib/supabase/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Relay } from "@/types/relay";
import RelayDetailClient from "./RelayDetailClient";

interface RelayDetailPageProps {
  params: {
    roomId: string;
    relayId: string;
  };
}

interface Post {
  id: number;
  created_at: string;
  created_by: string;
  image: string;
  relay_id: number;
  subtitle: string | null;
}

async function fetchRelayAndPosts(roomId: string, relayId: string): Promise<{
  relay: Relay | null;
  posts: Post[];
}> {
  try {
    // 認証チェック
    const { user, error: authError } = await getServerUser();

    if (authError || !user) {
      console.error("Authentication error:", authError);
      return { relay: null, posts: [] };
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
      return { relay: null, posts: [] };
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
      return { relay: null, posts: [] };
    }

    // このリレーの投稿を取得
    const { data: posts, error: postsError } = await supabase
      .from("post")
      .select("*")
      .eq("relay_id", parseInt(relayId))
      .order("created_at", { ascending: true });

    if (postsError) {
      console.error("Error fetching posts:", postsError);
      return { relay, posts: [] };
    }

    return { relay, posts: posts || [] };
  } catch (error) {
    console.error("Unexpected error in fetchRelayAndPosts:", error);
    return { relay: null, posts: [] };
  }
}

export default async function RelayDetailPage({ params }: RelayDetailPageProps) {
  const { roomId, relayId } = await params;
  const { relay, posts } = await fetchRelayAndPosts(roomId, relayId);

  if (!relay) {
    // リレーが見つからない場合やアクセス権がない場合
    return (
      <RelayDetailClient 
        relay={null} 
        posts={[]} 
        roomId={roomId} 
        relayId={relayId} 
      />
    );
  }

  return (
    <RelayDetailClient 
      relay={relay} 
      posts={posts} 
      roomId={roomId} 
      relayId={relayId} 
    />
  );
}
