import RoomList from "@/features/room/RoomList";
import { Room } from "@/types";
import { IoAdd } from "react-icons/io5";

// ダミーデータ
const rooms: Room[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `ルーム ${i + 1}`,
  description: `詳細 ${i + 1}`,
}));

export default function RoomPage() {
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
        <IoAdd
          className="text-3xl"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
