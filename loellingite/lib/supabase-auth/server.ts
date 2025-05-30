"use server";

import { CookieOptions, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'


export async function createClient() {
    const cookieStore = cookies()

    return createServerClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        if (typeof window === 'undefined') {
                            cookieStore.set({ name, value, ...options });
                        }
                    } catch (error) {
                        // Server Component内でのCookie設定エラーを無視
                        // ミドルウェアでCookieが処理される
                    }
                },
                remove(name: string, options: CookieOptions) {
                    try {
                        if (typeof window === 'undefined') {
                            cookieStore.set({ name, value: '', ...options, maxAge: 0 });
                        }
                    } catch (error) {
                        // Server Component内でのCookie削除エラーを無視
                    }
                }
            },
        }
    )
}