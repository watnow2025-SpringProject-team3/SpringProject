// リレー詳細画面

import Link from "next/link";

type Post = {
  id: string;
  title: string;
  createdAt: string;
  image: string;
};

const dummyRelay = {
  id: "r1",
  name: "リレー1",
  description: "このリレーは会議の進行用です。",
  createdAt: "2025-06-10",
};

const dummyPosts: Post[] = [
  { id: "p1", title: "最初の投稿", createdAt: "2025-06-11", image: "/images/post1.jpg" },
  { id: "p2", title: "議事録", createdAt: "2025-06-12", image: "/images/post2.jpg" },
];

export default function RelayDetailPage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary text-primary-foreground rounded shadow-md p-6 text-center mb-6">
          <h1 className="text-4xl font-bold mb-2">{dummyRelay.name}</h1>
          <p className="text-lg">{dummyRelay.description}</p>
          <p className="text-sm mt-2">作成日: {dummyRelay.createdAt}</p>
        </div>
        <div className="space-y-6">
          {dummyPosts.map((post) => (
            <Link
              key={post.id}
              href={`/rooms/relays/posts/${post.id}`}
              className="bg-card rounded shadow overflow-hidden block"
            >
              <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-foreground mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">作成日: {post.createdAt}</p>
                <div className="flex justify-between items-center">
                  <button className="text-primary hover:underline">いいね</button>
                  <span className="text-primary hover:underline">コメント</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
