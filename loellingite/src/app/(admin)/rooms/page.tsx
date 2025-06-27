import Footer from "@/component/Footer";
import RoomList from "@/features/room/RoomList";
import { Room } from "@/types";

// ダミーデータ
const rooms: Room[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `ルーム ${i + 1}`,
  description: `詳細 ${i + 1}`,
}));

export default function RoomPage() {
  return (
    <div className="min-h-screen font-Noto Serif">
      <header className="bg-header shadow-md sticky top-0 z-10 h-16 flex items-center justify-end px-4 sm:px-6" />
      <div className="max-w-2xl mx-auto">
        <RoomList rooms={rooms} />
      </div>
      <Footer />
    </div>
  );
}
