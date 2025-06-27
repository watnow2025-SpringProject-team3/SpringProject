import RoomList from "@/features/room/RoomList";
import { Room } from "@/types";
import { IoAdd } from "react-icons/io5";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import MenuLayout from "@/component/MenuLayout";

async function fetchRooms(): Promise<Room[]> {
  const supabase = createSupabaseServerClient();

  // 現在のユーザーを取得
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("Authentication error:", authError);
    return [];
  }

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
}

export default async function RoomPage() {
  const rooms = await fetchRooms();
  return (
    <MenuLayout>
      <div className="min-h-screen font-Noto Serif">
        {/* ヘッダー */}
        <header className="fixed top-0 left-0 w-full h-16 bg-[#7B5858] text-white px-4 py-3 flex items-center justify-between shadow z-0"></header>
        <div className="max-w-2xl mx-auto pt-16">
          <RoomList rooms={rooms} />
        </div>
        <button
          className="fixed bottom-6 right-6 bg-[#7B5858] text-white rounded-full p-4 shadow-lg hover:bg-[#5E4545]"
          aria-label="Add Room"
        >
          <IoAdd className="text-3xl" aria-hidden="true" />
        </button>
      </div>
    </MenuLayout>
  );
}
