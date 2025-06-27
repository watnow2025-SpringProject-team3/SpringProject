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

        // セッションが正常に作成された場合
        const response = NextResponse.redirect(`${origin}${next}`);

        // クッキーを手動で設定
        response.cookies.set("sb-access-token", data.session.access_token, {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 7日間
        });

        response.cookies.set("sb-refresh-token", data.session.refresh_token, {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 30, // 30日間
        });

        return response;
      }
    } catch (error) {
      console.error("Auth callback error:", error);
      return NextResponse.redirect(`${origin}/login?error=callback_failed`);
    }
  }

  console.log("No code received in callback");
  return NextResponse.redirect(`${origin}/login?error=no_code`);
}
