"use client";

import React, { useState, useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { Relay } from "@/types/relay";

interface RelayListProps {
  roomId: string;
}

const RelayList = ({ roomId }: RelayListProps) => {
  const [relays, setRelays] = useState<Relay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    const fetchRelays = async () => {
      try {
        setLoading(true);
        setError(null);

        // 認証チェック
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          setError("認証に失敗しました");
          return;
        }

        // 指定されたルームのリレーを取得
        const { data: relayData, error: relayError } = await supabase
          .from("relay")
          .select("*")
          .eq("room_id", parseInt(roomId))
          .order("created_at", { ascending: false });

        if (relayError) {
          console.error("Error fetching relays:", relayError);
          setError("リレーの取得に失敗しました");
          return;
        }

        setRelays(relayData || []);
      } catch (error) {
        console.error("Unexpected error:", error);
        setError("予期しないエラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchRelays();
    }
  }, [roomId, supabase]);

  if (loading) {
    return (
      <main className="pt-16 pb-28 px-4 overflow-y-auto">
        <div className="flex justify-center items-center py-8">
          <p className="text-gray-600">リレーを読み込み中...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="pt-16 pb-28 px-4 overflow-y-auto">
        <div className="flex justify-center items-center py-8">
          <p className="text-red-600">{error}</p>
        </div>
      </main>
    );
  }

  if (relays.length === 0) {
    return (
      <main className="pt-16 pb-28 px-4 overflow-y-auto">
        <div className="flex justify-center items-center py-8">
          <p className="text-gray-600">このルームにはまだリレーがありません</p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16 pb-28 px-4 overflow-y-auto">
      {relays.map((relay) => (
        <div
          key={relay.id}
          className="mb-4 flex items-center border border-[#7B5858] rounded-lg p-6 min-h-[120px] bg-white cursor-pointer"
          onClick={() => window.location.href = `/rooms/${roomId}/${relay.id}`}
        >
          {/* 左の画像 */}
          <div className="w-24 h-24 bg-[#E0D9D9] rounded-md flex-shrink-0" />

          {/* 右の情報 */}
          <div className="ml-4 flex flex-col">
            <div className="w-12 h-12 bg-[#E0D9D9] rounded-full mb-1" />
            <p className="text-[#7B5858] font-semibold text-sm">
              {relay.title || relay.name || "無題のリレー"}
            </p>
            <p className="text-xs text-gray-600">
              {relay.theme || relay.description || "テーマが設定されていません"}
            </p>
          </div>
        </div>
      ))}
    </main>
  );
};

export default RelayList;
