import React from "react";
import { serverSignInWithGoogle } from "@/lib/supabase/authGoogleServer";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primaryBackground">
      <div className="w-full max-w-xs space-y-6">
        <Image
          src={"/banner.png"}
          alt="Logo"
          width={100}
          height={100}
          className="mx-auto mb-6 w-3/4"
        />

        {/* 通常のログインフォーム（現在は無効化） */}
        <div>
          <button
            type="button"
            disabled
            className="w-full px-4 py-3 font-bold bg-[#7B5858] opacity-50 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ログイン
          </button>
        </div>

        {/* Googleログイン（Server Action） */}
        <div className="text-center">
          <form action={serverSignInWithGoogle}>
            <button
              type="submit"
              className="text-primaryText hover:underline bg-[#7B5858] text-white w-full px-4 py-3 rounded-lg focus:outline-none hover:bg-opacity-90"
            >
              Googleでログイン
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
