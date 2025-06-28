import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/rooms";

  console.log("Auth callback received:", {
    code: code?.substring(0, 8) + "...",
    next,
    userAgent: request.headers.get('user-agent')?.substring(0, 50) + "...",
  });

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
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
              console.error("Cookie setting error:", error);
            }
          },
        },
      }
    );

    try {
      console.log("Attempting to exchange code for session...");

      // PKCEフローでセッション交換を実行
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Code exchange error:", error.message, error.status);
        return NextResponse.redirect(
          `${origin}/login?error=auth_exchange_failed`
        );
      }

      if (data?.session) {
        console.log("Auth successful, user:", data.session.user.email);

        // セッションが正常に作成された場合、単純にリダイレクト
        // クッキーはSupabaseが自動的に設定する
        return NextResponse.redirect(`${origin}${next}`);
      }
    } catch (error) {
      console.error("Auth callback error:", error);
      return NextResponse.redirect(`${origin}/login?error=callback_failed`);
    }
  }

  console.log("No code received in callback");
  return NextResponse.redirect(`${origin}/login?error=no_code`);
}
