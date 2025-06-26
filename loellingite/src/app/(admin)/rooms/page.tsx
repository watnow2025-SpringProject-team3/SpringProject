import Link from "next/link";
import Footer from "@/component/Footer";

// ダミーデータ
const rooms = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: "ルーム名",
  description: "詳細",
}));

export default function RoomPage() {
  return (
    <div className="bg-[#F7F5F2] min-h-screen font-sans pb-16">
      <header className="bg-[#7B5858] shadow-md sticky top-0 z-10 h-16 flex items-center justify-between px-4 sm:px-6">
      </header>

      <div className="max-w-2xl mx-auto">
        <ul className="bg-white/30">
          {rooms.map((room) => (
            <li key={room.id} className="border-b-[0.5px] border-[#7B5858]">
              <Link href={`/rooms/${room.id}`} passHref>
                <div className="p-4 flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full bg-[#E0D8D4] flex-shrink-0 border-[#7B5858] border-[0.5px]"></div>
                  <div className="flex-grow">
                    <h2 className="text-lg font-medium text-[#7B5858]">
                      {room.name}
                    </h2>
                    <p className="text-sm text-[#7B5858E5]">
                      {room.description}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </div>
  );
}
