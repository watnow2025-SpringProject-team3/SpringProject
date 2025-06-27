import { Room } from "@/types";
import { createSupabaseServerClient, getServerUser } from "@/lib/supabase/server";
import RoomPageClient from "@/component/RoomPageClient";

async function fetchRooms(): Promise<Room[]> {
  try {
    // 安全な認証ユーザー取得を使用
    const { user, error: authError } = await getServerUser();

    if (authError) {
      console.error("Server authentication error:", authError);
      return [];
    }

    if (!user) {
      console.log("Server: No user found");
      return [];
    }

    const supabase = await createSupabaseServerClient();

    // 自分が参加しているルームのみを取得
    const { data, error } = await supabase
      .from("room")
      .select(
        `
        *,
        roomUser!inner(user_id)
      `
      )
      .eq("roomUser.user_id", user.id);

    if (error) {
      console.error("Error fetching rooms:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Unexpected error in fetchRooms:", error);
    return [];
  }
}

export default async function RoomPage() {
  // 認証チェック
  const { user, error } = await getServerUser();
  
  // 認証されていない場合は空の配列を渡してクライアントサイドでリダイレクト
  if (!user || error) {
    console.log("RoomPage: User not authenticated, passing empty rooms for client redirect");
    return <RoomPageClient initialRooms={[]} requiresAuth={true} />;
  }

  const rooms = await fetchRooms();
  return <RoomPageClient initialRooms={rooms} requiresAuth={false} />;
}
