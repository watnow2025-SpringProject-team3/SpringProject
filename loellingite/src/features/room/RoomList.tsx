import Link from "next/link";
import { IoChatbubblesOutline } from "react-icons/io5";

interface Room {
  id: number;
  title: string; // room.name を room.title に変更
  created_at: string; // description の代わりに created_at を追加
}

interface RoomListProps {
  rooms: Room[];
}

export default function RoomList({ rooms }: RoomListProps) {
  return (
    <ul className="divide-y divide-gray-200 bg-white">
      {rooms.map((room) => (
        <li key={room.id}>
          <Link
            href={`/rooms/${room.id}`}
            className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center">
              <IoChatbubblesOutline className="text-gray-500 w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              {/* room.name → room.title に変更 */}
              <div className="font-semibold text-gray-900">{room.title}</div>
              {/* descriptionはSupabaseにないので削除またはフォールバック */}
              <div className="text-gray-500 text-sm">
                作成日: {new Date(room.created_at).toLocaleDateString()}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
