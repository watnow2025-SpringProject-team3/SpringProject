// 投稿詳細画面

import Link from "next/link";

const dummyPost = {
  id: "p1",
  title: "会議の議事録",
  content: "会議の内容をまとめた議事録です。",
  createdAt: "2025-06-20",
};

export default function PostDetailPage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary text-primary-foreground rounded-t shadow p-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{dummyPost.title}</h1>
        </div>
        <div className="bg-card rounded-b shadow p-6">
          <p className="text-lg text-muted-foreground mb-4">{dummyPost.content}</p>
          <p className="text-sm text-muted-foreground">作成日: {dummyPost.createdAt}</p>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="../"
            className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/80 transition"
          >
            戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
