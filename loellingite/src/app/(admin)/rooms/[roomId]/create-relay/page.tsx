// リレー作成画面

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateRelayPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("リレー名は必須です");
      return;
    }
    // 本来はAPIで作成処理
    alert("リレーを作成しました！");
    router.back();
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">新規リレー作成</h1>
      <form onSubmit={handleSubmit} className="bg-card p-6 rounded shadow space-y-4">
        <div>
          <label className="block mb-1 font-semibold">リレー名</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="例: 進行リレー"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">説明</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="リレーの用途や説明を入力"
          />
        </div>
        {error && <p className="text-destructive">{error}</p>}
        <button
          type="submit"
          className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/80"
        >
          作成
        </button>
      </form>
    </main>
  );
}
