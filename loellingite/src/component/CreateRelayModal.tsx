"use client";

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

interface CreateRelayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (relayData: { name: string; description: string; theme: string }) => Promise<void>;
}

export default function CreateRelayModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateRelayModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError("リレー名は必須です");
      return;
    }

    if (!theme.trim()) {
      setError("テーマは必須です");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
        theme: theme.trim(),
      });
      
      // 成功したらフォームをリセットしてモーダルを閉じる
      setName("");
      setDescription("");
      setTheme("");
      onClose();
    } catch (error) {
      console.error("Error creating relay:", error);
      setError(error instanceof Error ? error.message : "リレーの作成に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setName("");
      setDescription("");
      setTheme("");
      setError(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">新しいリレーを作成</h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-1 hover:bg-gray-100 rounded-full disabled:opacity-50"
          >
            <IoClose size={24} className="text-gray-500" />
          </button>
        </div>

        {/* フォーム */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            {/* リレー名 */}
            <div>
              <label htmlFor="relay-name" className="block text-sm font-medium text-gray-700 mb-1">
                リレー名 *
              </label>
              <input
                id="relay-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B5858] focus:border-transparent disabled:opacity-50"
                placeholder="リレー名を入力"
                maxLength={100}
              />
            </div>

            {/* テーマ */}
            <div>
              <label htmlFor="relay-theme" className="block text-sm font-medium text-gray-700 mb-1">
                テーマ *
              </label>
              <input
                id="relay-theme"
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B5858] focus:border-transparent disabled:opacity-50"
                placeholder="リレーのテーマを入力"
                maxLength={200}
              />
            </div>

            {/* 説明（現在未対応のためコメントアウト） */}
            {/* <div>
              <label htmlFor="relay-description" className="block text-sm font-medium text-gray-700 mb-1">
                説明
              </label>
              <textarea
                id="relay-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B5858] focus:border-transparent disabled:opacity-50"
                placeholder="リレーの説明を入力（任意）"
                rows={3}
                maxLength={500}
              />
            </div> */}

            {/* エラーメッセージ */}
            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* ボタン */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim()}
              className="flex-1 px-4 py-2 bg-[#7B5858] text-white rounded-md hover:bg-[#6A4A4A] disabled:opacity-50"
            >
              {isSubmitting ? "作成中..." : "作成"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
