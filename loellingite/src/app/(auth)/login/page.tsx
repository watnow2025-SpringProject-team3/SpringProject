import React from "react";
import { getServerUser } from "@/lib/supabase/server";
import LoginPageClient from "./LoginPageClient";

export default async function LoginPage() {
  // 認証チェック
  const { user, error } = await getServerUser();
  
  // 認証済みの場合はクライアントサイドでリダイレクト
  if (user && !error) {
    console.log("LoginPage: User already authenticated, redirecting to rooms");
    return <LoginPageClient shouldRedirect={true} />;
  }

  return <LoginPageClient shouldRedirect={false} />;
}
