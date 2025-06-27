"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { createSupabaseBrowserClient } from "./browser";

// Googleログイン
export async function serverSignInWithGoogle() {
  const supabase = createSupabaseServerClient();
  const {
    data: { url },
    error,
  } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.SUPABASE_AUTH_URL}/api/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  if (error) console.error("Googleログインエラー:", error.message);
  if (!error && url) redirect(url);
}

// クライアントコンポーネントのGoogleログイン
export async function browserSignInWithGoogle() {
  const supabase = createSupabaseBrowserClient();
  const {
    data: { url },
    error,
  } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) console.error("Googleログインエラー:", error.message);
  if (!error && url) window.location.href = url;
}

// サーバーコンポーネントのGoogleログアウト
export async function serverSignOut() {
  // クライアントを作成
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Googleログアウトエラー:", error.message);
  if (!error) return true;
  return false;
}

// クライアントコンポーネントのGoogleログアウト
export async function browserSignOut() {
  // クライアントを作成
  const supabase = createSupabaseBrowserClient();
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Googleログアウトエラー:", error.message);
  if (!error) return true;
  return false;
} 