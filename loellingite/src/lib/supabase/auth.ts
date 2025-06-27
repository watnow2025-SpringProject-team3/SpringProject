import { cache } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./server";
import { createSupabaseBrowserClient } from "./browser";

// メール・パスワードでのログイン
export const signInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const supabase = createSupabaseBrowserClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};

// 認証チェック
const validateAuthWithRedirect = async () => {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    redirect("/login");
  }
  return user;
};

export const cachedValidateAuthWithRedirect = cache(validateAuthWithRedirect);
