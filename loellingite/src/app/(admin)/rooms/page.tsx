// ルーム一覧画面
"use client";

import Link from "next/link";
import Button from "@/component/Button";
import { useRouter } from "next/navigation";

type Room = {
  id: string;
  name: string;
  createdAt: string;
};

import AdminLayout from "../layout";

export default function RoomsPage({ rooms = [] }: { rooms?: Room[] }) {
  const router = useRouter();
  return (
    <AdminLayout
      title="ルーム一覧"
      links={[
        { title: "Settings", href: "/settings" },
      ]}
    >
      <main className="min-h-screen bg-background pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              ルーム一覧
            </h1>
            <Button onClick={() => router.push("/rooms/create-room")}>
              作成
            </Button>
          </div>
          {rooms.length === 0 ? (
            <p className="text-center text-muted-foreground">
              現在、ルームはありません。新しいルームを作成してください。
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <div key={room.id} className="bg-card rounded shadow p-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    {room.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    作成日: {room.createdAt}
                  </p>
                  <Link
                    href={`/rooms/${room.id}`}
                    className="text-primary hover:underline text-sm mt-2 inline-block"
                  >
                    詳細を見る
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </AdminLayout>
  );
}
