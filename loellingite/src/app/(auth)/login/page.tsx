"use client";

import React from "react";
import Link from "next/link";
import { serverSignInWithGoogle } from "@/lib/supabase/authGoogle";

export default function LoginPage() {

  const handleGoogleLogin =async () => {
    await serverSignInWithGoogle();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="bg-card p-8 rounded shadow text-center space-y-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-primary">ログイン</h1>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition"
        >
          Googleでログイン
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
