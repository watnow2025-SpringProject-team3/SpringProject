import { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // Server Components では set できない場合があるため無視
            console.debug("Server client cookie setting ignored:", error);
          }
        },
      },
    }
  );
}

// サーバーサイドでの安全な認証ユーザー取得
export async function getServerUser() {
  try {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.auth.getUser();
    
    if (result.error) {
      // AuthSessionMissingErrorは予想される状況
      if (
        result.error.message?.includes('Auth session missing') ||
        'name' in result.error && result.error.name === 'AuthSessionMissingError'
      ) {
        return { user: null, error: null };
      }
      return { user: null, error: result.error };
    }
    
    return { user: result.data.user, error: null };
  } catch (error: unknown) {
    const errorObj = error as Error;
    // AuthSessionMissingErrorは予想される状況
    if (
      errorObj.message?.includes('Auth session missing') ||
      errorObj.name === 'AuthSessionMissingError'
    ) {
      return { user: null, error: null };
    }
    return { user: null, error: errorObj };
  }
}
