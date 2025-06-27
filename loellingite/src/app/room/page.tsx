import Link from 'next/link';
import RoomGrid from '@/components/RoomGrid';

// ダミーデータ
const rooms = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: 'ルーム名',
    description: '詳細',
}));

export default function RoomPage() {
    return (
        <div className="bg-[#F7F5F2] min-h-screen font-Noto Serif">
            <header className="bg-[#7B5858] shadow-md sticky top-0 z-10 h-16 flex items-center justify-end px-4 sm:px-6" / >
            <RoomGrid rooms={rooms} />
        </div>
    );
}
