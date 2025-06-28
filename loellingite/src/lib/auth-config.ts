// Google OAuth認証設定のヘルパー関数

export function getGoogleAuthConfig() {
  const isProduction = process.env.NODE_ENV === 'production';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                  (isProduction ? 'https://nyecjljpwxdburikthgc.supabase.co' : 'http://localhost:3000');

  return {
    redirectTo: `${siteUrl}/api/auth/callback`,
    queryParams: {
      access_type: "offline",
      prompt: "consent",
      include_granted_scopes: "true",
    },
    scopes: "openid email profile",
    // User-Agent問題を回避するための追加設定
    skipBrowserRedirect: false,
  };
}

export function isUserAgentAllowed(userAgent: string): boolean {
  // Googleで許可されていないUser-Agentパターンをチェック
  const disallowedPatterns = [
    /Next\.js/i,
    /Vercel/i,
    /node-fetch/i,
    /curl/i,
    /wget/i,
  ];

  return !disallowedPatterns.some(pattern => pattern.test(userAgent));
}

export function getCompatibleUserAgent(originalUserAgent: string): string {
  if (isUserAgentAllowed(originalUserAgent)) {
    return originalUserAgent;
  }

  // 互換性のあるUser-Agentに変換
  return 'Mozilla/5.0 (compatible; OAuth2Client/1.0; +https://developers.google.com/identity/protocols/oauth2)';
}
