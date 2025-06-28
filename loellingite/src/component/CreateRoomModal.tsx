"use client";

import React, { useState } from "react";
import { IoCheckmark } from "react-icons/io5";

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (roomData: { name: string; description: string }) => Promise<void>;
}

export default function CreateRoomModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateRoomModalProps) {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      await onSubmit({
        name: roomName.trim(),
        description: description.trim(),
      });
      // 成功時にフォームをリセット
      setRoomName("");
      setDescription("");
      setError(null);
      onClose();
    } catch (error) {
      console.error("Room creation failed:", error);
      setError(
        error instanceof Error ? error.message : "ルームの作成に失敗しました"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setRoomName("");
      setDescription("");
      setError(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* オーバーレイ */}
      <div
        className="fixed inset-0 bg-black opacity-70 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        {/* モーダルコンテンツ */}
        <div
          className="bg-white rounded-2xl p-6 w-full max-w-md mx-auto relative text-[#7B5858]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ヘッダー */}
          <div className="text-center mb-6">
            <h2 className="text-xl">新しいルームを作る</h2>
          </div>

          {/* フォーム */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* エラーメッセージ */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* ルーム名入力 */}
            <div>
              <label className="block text-sm font-medium  mb-2">
                ルーム名
              </label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="名前を入力してください"
                className="w-full px-4 py-3 bg-[#C4B5B5] rounded-md placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#7B5858]"
                disabled={isLoading}
                required
              />
            </div>

            {/* 詳細入力 */}
            {/* <div>
              <label className="block text-sm font-medium  mb-2">
                詳細
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="どんなルームにしますか？"
                rows={4}
                className="w-full px-4 py-3 bg-[#C4B5B5] rounded-lg placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#7B5858] resize-none"
                disabled={isLoading}
              />
            </div> */}

            {/* 送信ボタン */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={!roomName.trim() || isLoading}
                className="bg-[#7B5858] text-white rounded-full p-4 shadow-lg hover:bg-[#6A4A4A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <IoCheckmark size={24} />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
