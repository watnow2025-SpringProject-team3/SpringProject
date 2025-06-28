"use client";

import { createSupabaseBrowserClient } from "./browser";

// クライアントコンポーネント用のGoogleログイン
export async function browserSignInWithGoogle() {
  const supabase = createSupabaseBrowserClient();
  const {
    data: { url },
    error,
  } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/api/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      skipBrowserRedirect: false,
    },
  });
  if (error) console.error("Googleログインエラー:", error.message);
  if (url) {
    // User-Agentの問題を回避するため、windowオブジェクトを使用
    const newWindow = window.open(url, "_self");
    if (!newWindow) {
      // ポップアップがブロックされた場合のフォールバック
      window.location.href = url;
    }
  }
}

// クライアントコンポーネント用のGoogleログアウト
export async function browserSignOut() {
  const supabase = createSupabaseBrowserClient();
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Googleログアウトエラー:", error.message);
  if (!error) {
    window.location.href = "/login";
    return true;
  }
  return false;
}
