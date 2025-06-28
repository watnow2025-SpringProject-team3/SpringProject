import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  let user = null;
  let authError: Error | null = null;

  try {
    const result = await supabase.auth.getUser();
    user = result.data.user;
    authError = result.error;
  } catch (error: unknown) {
    console.error("Middleware auth error (catch):", error);
    authError = error as Error;
    user = null;
  }

  // 認証エラーがある場合の処理
  if (authError) {
    console.error("Middleware auth error:", authError.message || authError);
    // AuthSessionMissingErrorの場合は、セッションが存在しないということなので、未認証として扱う
    if (
      (authError.message && authError.message.includes('Auth session missing')) || 
      authError.name === 'AuthSessionMissingError'
    ) {
      console.log("Auth session missing - treating as unauthenticated");
      user = null;
      authError = null; // このエラーは予想される状況なので、エラーとして扱わない
    }
  }

  const pathname = request.nextUrl.pathname;

  // (admin)ルートグループ：認証必須（/rooms, /settings配下のすべて）
  const isAdminPath =
    pathname.startsWith("/rooms") || pathname.startsWith("/settings");

  // (auth)ルートグループ：非認証必須（/login, /signup）
  const isAuthPath = pathname === "/login" || pathname === "/signup";

  // 認証が必要なパス全体
  const requiresAuth = isAdminPath;

  // ルートパスの処理
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    if (user && !authError) {
      url.pathname = "/rooms";
    } else {
      url.pathname = "/login";
    }
    return NextResponse.redirect(url);
  }

  console.log(
    `Request path: ${pathname}, isAdminPath: ${isAdminPath}, isAuthPath: ${isAuthPath}, user: ${
      user ? "authenticated" : "not authenticated"
    }, authError: ${authError ? authError.message : "none"}`
  );

  // 認証が必要なパス（(admin)ルートグループ + 既存の/room/パス）の認証チェック
  if (requiresAuth && (!user || authError)) {
    console.log(
      `Redirecting unauthenticated user from protected path: ${pathname}`
    );
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // (auth)ルートグループの認証チェック：非ログイン必須
  if (isAuthPath && user && !authError) {
    console.log(`Redirecting authenticated user from auth path: ${pathname}`);
    const url = request.nextUrl.clone();
    url.pathname = "/rooms";
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
