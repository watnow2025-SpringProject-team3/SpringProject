import Link from "next/link";
import Header from "@/component/Header";

export default function Home() {
  return (
    <>
      <Header title="サービス名" href="/" />
      <main className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="bg-card p-2 sm:p-4 rounded shadow-xl dark:shadow-zinc-900/60 text-center space-y-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-primary">ようこそ</h1>
        <p className="text-muted-foreground">ログインまたは新規登録してください。</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="w-full sm:w-auto px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition"
          >
            ログイン
          </Link>
          <Link
            href="/signup"
            className="w-full sm:w-auto px-6 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 transition"
          >
            新規登録
          </Link>
        </div>
      </div>
    </main>
    </>
  );
}
