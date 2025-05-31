import { type NextRequest } from 'next/server'
import { updateSession } from '../../lib/supabase-auth/middleware'


export async function middleware(request: NextRequest) {
    return await updateSession(request)
}

export const config = {
    matcher: [
        // 以下のパスは除外されます: 
        // - api/auth/*
        // - _next/static, _next/image, favicon.ico, 画像関連ファイル
        '/((?!api/auth/.*|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}