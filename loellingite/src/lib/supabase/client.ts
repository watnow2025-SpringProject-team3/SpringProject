"use client";

import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/supabase";

let client: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function getSupabaseBrowserClient() {
  if (!client) {
    client = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return client;
}

// 既存のコードとの互換性のために残す
export function createSupabaseBrowserClient() {
  return getSupabaseBrowserClient();
}
