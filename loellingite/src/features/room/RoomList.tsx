import Link from "next/link";
import { IoChatbubblesOutline } from "react-icons/io5";

interface Room {
  id: number;
  name: string;
  description: string;
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
            <div className="flex-shrink-0 w-12 h-12 bg-[#E0D6D6] rounded-full flex items-center justify-center">
              <IoChatbubblesOutline className="text-gray-500 w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900">{room.name}</div>
              <div className="text-gray-500 text-sm">{room.description}</div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
