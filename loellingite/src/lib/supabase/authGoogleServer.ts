"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// サーバーコンポーネント用のGoogleログイン
export async function serverSignInWithGoogle() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { url },
    error,
  } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/api/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
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
