"use client";

import React from "react";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F0F0]">
            <div className="w-full max-w-xs space-y-6">
                <div className="bg-gray-300 h-32 w-full">ロゴ？</div>
                
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="メールアドレス"
                        className="w-full px-4 py-3 text-white bg-[#d8c7c7] rounded-lg focus:outline-none placeholder-white border border-[#7B5858]"
                    />
                    <input
                        type="password"
                        placeholder="パスワード"
                        className="w-full px-4 py-3 text-white bg-[#d8c7c7] rounded-lg focus:outline-none placeholder-white border border-[#7B5858]"
                    />
                </div>

                <button
                    className="w-full px-4 py-3 font-bold text-white bg-[#8b6f6f] rounded-lg hover:bg-opacity-90 focus:outline-none"
                >
                    ログイン
                </button>
            </div>
        </div>
    );
}