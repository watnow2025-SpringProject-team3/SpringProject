"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { serverSignInWithGoogle } from "@/lib/supabase/authGoogle";
import { signInWithEmailAndPassword } from "@/lib/supabase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGoogleLogin = async () => {
    await serverSignInWithGoogle();
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(email, password);
      router.push("/rooms");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "ログインに失敗しました";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F0F0]">
      <form onSubmit={handleEmailLogin} className="w-full max-w-xs space-y-6">
        <div className="bg-gray-300 h-32 w-full">ロゴ？</div>

        {error && (
          <div className="p-3 text-red-600 bg-red-100 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="w-full px-4 py-3 text-white bg-[#7B585880] rounded-lg focus:outline-none placeholder-white border border-[#7B5858] disabled:opacity-50"
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className="w-full px-4 py-3 text-white bg-[#7B585880] rounded-lg focus:outline-none placeholder-white border border-[#7B5858] disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-3 font-bold text-white bg-[#8b6f6f] rounded-lg hover:bg-opacity-90 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "ログイン中..." : "ログイン"}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="text-[#8b6f6f] hover:underline"
          >
            Googleでログイン
          </button>
        </div>
      </form>
    </div>
  );
}
