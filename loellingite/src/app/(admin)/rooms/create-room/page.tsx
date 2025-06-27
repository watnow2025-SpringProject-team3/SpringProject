// ルーム作成画面

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateRoomPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("ルーム名は必須です");
      return;
    }
    // 本来はAPIで作成処理
    alert("ルームを作成しました！");
    router.push("/rooms");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-lg bg-card rounded shadow p-4 sm:p-8 mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground text-center">新規ルーム作成</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">ルーム名</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded bg-background text-foreground"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="例: 会議室A"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">説明</label>
          <textarea
            className="w-full border px-3 py-2 rounded bg-background text-foreground"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="ルームの用途や説明を入力"
          />
        </div>
        {error && <p className="text-destructive">{error}</p>}
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/80 text-base sm:text-lg font-semibold transition"
        >
          作成
        </button>
        </form>
      </div>
    </main>
  );
}
