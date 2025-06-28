"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getGoogleAuthConfig } from "@/lib/auth-config";

// サーバーコンポーネント用のGoogleログイン
export async function serverSignInWithGoogle() {
  const supabase = await createSupabaseServerClient();
  const authConfig = getGoogleAuthConfig();
  
  const {
    data: { url },
    error,
  } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: authConfig,
  });
  if (error) console.error("Googleログインエラー:", error.message);
  if (!error && url) redirect(url);
}

// サーバーコンポーネント用のGoogleログアウト
export async function serverSignOut() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Googleログアウトエラー:", error.message);
  if (!error) redirect("/login");
}
