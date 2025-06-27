import Link from 'next/link';

interface Room {
  id: number;
  name: string;
  description: string;
}

interface RoomGridProps {
  rooms: Room[];
}

export default function RoomGrid({ rooms }: RoomGridProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <ul className="space-y-4">
        {rooms.map((room) => (
          <li key={room.id} className="flex border-2 border-[#8B6B67] rounded-2xl p-5 mb-6 bg-white items-start gap-4">
            <Link href={`/rooms/${room.id}`} passHref>
              <div className="p-4 flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full bg-[#E0D8D4] flex-shrink-0 border-[#7B5858] border-[0.5px]"></div>
                <div className="flex-grow">
                  <h2 className="text-lg font-medium text-[#7B5858]">{room.name}</h2>
                  <p className="text-sm text-[#7B5858]">{room.description}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 