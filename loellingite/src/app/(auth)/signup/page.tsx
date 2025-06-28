import React from "react";
import { getServerUser } from "@/lib/supabase/server";
import SignupPageClient from "./SignupPageClient";

export default async function SignupPage() {
  // 認証チェック
  const { user, error } = await getServerUser();
  
  // 認証済みの場合はクライアントサイドでリダイレクト
  if (user && !error) {
    console.log("SignupPage: User already authenticated, redirecting to rooms");
    return <SignupPageClient shouldRedirect={true} />;
  }

  return <SignupPageClient shouldRedirect={false} />;
}
