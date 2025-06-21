// ルームホーム画面

import Link from "next/link";

type Relay = {
  id: string;
  name: string;
  createdAt: string;
};

const dummyRelays: Relay[] = [
  { id: "r1", name: "リレー1", createdAt: "2025-06-10" },
  { id: "r2", name: "リレー2", createdAt: "2025-06-15" },
];

export default function RoomHomePage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">リレー一覧</h2>
          <Link
            href={`./create-relay`}
            className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/80 transition"
          >
            新規リレー作成
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {dummyRelays.map((relay) => (
            <div key={relay.id} className="bg-card rounded shadow p-4">
              <h3 className="text-lg font-semibold text-foreground">{relay.name}</h3>
              <p className="text-sm text-muted-foreground">作成日: {relay.createdAt}</p>
              <Link
                href={`/rooms/relays/${relay.id}`}
                className="text-primary hover:underline text-sm mt-2 inline-block"
              >
                詳細を見る
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
