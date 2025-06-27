import RoomList from "@/features/room/RoomList";
import { Room } from "@/types";
import { IoAdd } from "react-icons/io5";

import { createSupabaseServerClient } from "@/lib/supabase/server";

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
    <div className="min-h-screen font-Noto Serif">
      <header className="bg-[#7B5858] shadow-md sticky top-0 z-10 h-16 flex items-center justify-end px-4 sm:px-6" />
      <div className="max-w-2xl mx-auto">
        <RoomList rooms={rooms} />
      </div>
      <button
        className="fixed bottom-6 right-6 bg-[#7B5858] text-white rounded-full p-4 shadow-lg hover:bg-[#5E4545]"
        aria-label="Add Room"
      >
        <IoAdd className="text-3xl" aria-hidden="true" />
      </button>
    </div>
  );
}
