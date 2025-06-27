// 投稿作成画面

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("タイトルは必須です");
      return;
    }
    // 本来はAPIで作成処理
    alert("投稿を作成しました！");
    router.back();
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">新規投稿作成</h1>
      <form onSubmit={handleSubmit} className="bg-card p-6 rounded shadow space-y-4">
        <div>
          <label className="block mb-1 font-semibold">タイトル</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="投稿タイトルを入力"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">本文</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            placeholder="投稿内容を入力"
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
