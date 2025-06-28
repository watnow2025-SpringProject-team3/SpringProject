"use client";

import React, { useState, useEffect } from "react";
import { MdArrowBack, MdCamera } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Relay } from "@/types/relay";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

interface CreatePostClientProps {
  relay: Relay | null;
  roomId: string;
  relayId: string;
}

export default function CreatePostClient({ 
  relay, 
  roomId, 
  relayId 
}: CreatePostClientProps) {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  // リレーが見つからないかアクセス権がない場合のリダイレクト
  useEffect(() => {
    if (!relay) {
      console.log("Relay not found or access denied, redirecting to relay");
      window.location.href = `/rooms/${roomId}/${relayId}`;
    }
  }, [relay, roomId, relayId]);

  const handleBack = () => {
    router.push(`/rooms/${roomId}/${relayId}`);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      setError("説明は必須です");
      return;
    }

    if (!image) {
      setError("画像は必須です");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // 認証チェック
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User authentication error:", userError);
        throw new Error("認証に失敗しました。ログインし直してください。");
      }

      // 画像をストレージにアップロード
      const fileName = `${Date.now()}_${image.name}`;
      console.log("Starting upload with user:", user.id);
      console.log("File name:", fileName);
      console.log("File size:", image.size);
      console.log("File type:", image.type);
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("posts")
        .upload(fileName, image);

      if (uploadError) {
        console.error("Detailed upload error:", uploadError);
        console.error("Error message:", uploadError.message);
        console.error("Error details:", JSON.stringify(uploadError, null, 2));
        
        // より詳細なエラーメッセージ
        let errorMessage = "画像のアップロードに失敗しました。";
        if (uploadError.message?.includes('403') || uploadError.message?.includes('Unauthorized')) {
          errorMessage += " (権限エラー: Storageポリシーが設定されていない可能性があります)";
        } else if (uploadError.message?.includes('404') || uploadError.message?.includes('not found')) {
          errorMessage += " (バケットが見つかりません)";
        } else if (uploadError.message?.includes('413') || uploadError.message?.includes('too large')) {
          errorMessage += " (ファイルサイズが大きすぎます)";
        }
        errorMessage += ` 詳細: ${uploadError.message}`;
        throw new Error(errorMessage);
      }

      console.log("Upload successful:", uploadData);

      // 投稿をデータベースに保存
      const { data: newPost, error: postError } = await supabase
        .from("post")
        .insert({
          relay_id: parseInt(relayId),
          created_by: user.id,
          image: uploadData.path,
          subtitle: description.trim(),
        })
        .select()
        .single();

      if (postError) {
        console.error("Post creation error:", postError);
        throw new Error("投稿の作成に失敗しました。");
      }

      console.log("Post created successfully:", newPost);
      
      // 成功したらリレー詳細ページに戻る
      router.push(`/rooms/${roomId}/${relayId}`);
      
    } catch (error) {
      console.error("Error creating post:", error);
      setError(error instanceof Error ? error.message : "投稿の作成に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  // リダイレクト中の表示
  if (!relay) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">リレーが見つからないか、アクセス権がありません。</p>
          <p className="text-gray-600">リダイレクト中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ヘッダー */}
      <header className="bg-[#7B5858] text-white h-14 flex items-center justify-between px-4 sticky top-0 z-10">
        <button className="p-2" title="戻る" onClick={handleBack}>
          <MdArrowBack size={28} />
        </button>
        <span className="text-lg font-medium">新しい投稿</span>
        <div className="w-12"></div> {/* スペース調整 */}
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 px-4 py-6">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          {/* リレー情報 */}
          <div className="mb-6 p-4 bg-white rounded-lg border">
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              {relay.title || relay.name || "無題のリレー"}
            </h2>
            {relay.theme && (
              <p className="text-sm text-gray-600">
                テーマ: {relay.theme}
              </p>
            )}
          </div>

          {/* 画像アップロード */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              画像 *
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
                disabled={isSubmitting}
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#7B5858] bg-white"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="プレビュー"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <MdCamera size={48} className="text-gray-400 mb-2" />
                    <span className="text-gray-600">画像を選択</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* 説明 */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              説明 *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B5858] focus:border-transparent disabled:opacity-50"
              placeholder="投稿の説明を入力"
              rows={4}
              maxLength={500}
            />
          </div>

          {/* エラーメッセージ */}
          {error && (
            <div className="mb-6 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* 投稿ボタン */}
          <button
            type="submit"
            disabled={isSubmitting || !description.trim() || !image}
            className="w-full px-4 py-3 bg-[#7B5858] text-white rounded-md hover:bg-[#6A4A4A] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "投稿中..." : "投稿する"}
          </button>
        </form>
      </main>
    </div>
  );
}
