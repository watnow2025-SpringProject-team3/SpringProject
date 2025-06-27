"use client";

import React, { useEffect } from "react";
import Link from "next/link";

interface SignupPageClientProps {
  shouldRedirect: boolean;
}

export default function SignupPageClient({ shouldRedirect }: SignupPageClientProps) {
  // 認証済みの場合のリダイレクト処理
  useEffect(() => {
    if (shouldRedirect) {
      console.log("Client: User already authenticated, redirecting to rooms");
      window.location.href = "/rooms";
    }
  }, [shouldRedirect]);

  // リダイレクト中は何も表示しない
  if (shouldRedirect) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-primaryBackground">
        <div className="text-center">
          <p className="text-gray-600">リダイレクト中...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="bg-card p-8 rounded shadow text-center space-y-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-primary">新規登録</h1>
        {/* ここにサインアップフォームを追加 */}
        <button
          className="w-full px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition"
          disabled
        >
          Googleで新規登録（実装例）
        </button>
        <Link
          href="/"
          className="inline-block mt-4 text-secondary hover:underline"
        >
          トップページへ戻る
        </Link>
      </div>
    </main>
  );
}
